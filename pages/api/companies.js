// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const statement = await prisma.company.findMany();
    res.json(statement);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
