import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const mockERPData = {
      tables: [
        {
          name: "Orders",
          fields: ["OrderID", "CustomerID", "OrderDate", "TotalAmount"],
        },
        {
          name: "Products",
          fields: ["ProductID", "ProductName", "Category", "Price"],
        },
        {
          name: "Customers",
          fields: ["CustomerID", "Name", "Email", "Phone"],
        },
      ],
    };
    res.status(200).json(mockERPData);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
