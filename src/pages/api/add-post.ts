import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { newPost } = req.body;
    if (!newPost) {
      return res.status(400).json({ error: "newPost is required" });
    }

    try {
      const postsCollection = collection(db, "posts");
      const docRef = await addDoc(postsCollection, {
        content: newPost,
        createdAt: new Date(),
      });
      res.status(201).json({ message: "Post added", id: docRef.id });
    } catch (error) {
      console.error("Error adding post:", error);
      res.status(500).json({ error: "Failed to add post" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
