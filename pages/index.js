import { MongoClient } from "mongodb";
import MeetupList from "@/components/meetups/MeetupList";

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// export async function getServerSideProps(context) {
//   // server side, for data that change frequently
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://motahare:m2541380@cluster0.6wqtz.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((m) => ({
        title: m.title,
        description: m.description,
        address: m.address,
        image: m.image,
        id: m._id.toString(),
      })),
    },
    revalidate: 10, //10 seconds
  };
}

export default HomePage;
