import dbConnect from "../../../../db/connect.js";
import Place from "../../../../db/models/Place.js";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json(place);
  } else if (request.method === "PATCH") {
    const updateThisPlace = await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });
    response.status(200).json(updateThisPlace);
  }
}



// import { places } from '../../../../lib/db.js';

// export default function handler(request, response) {
//   const { id } = request.query;

//   if (!id) {
//     return;
//   }

//   const place = places.find((place) => place.id === id);

//   if (!place) {
//     return response.status(404).json({ status: 'Not found' });
//   }

//   response.status(200).json(place);
// }
