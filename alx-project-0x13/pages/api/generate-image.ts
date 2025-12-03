// // 

// import { HEIGHT, WIDTH } from "@/constants";
// import { RequestProps } from "@/interfaces";
// import { NextApiRequest, NextApiResponse } from "next"

// const handler = async (request: NextApiRequest, response: NextApiResponse) => {
//   const gptApiKey = process.env.RAPIDAPI_KEY;
//   const gptHost = process.env.RAPIDAPI_HOST;
//   const gptUrl = `https://${gptHost}/texttoimage`;

//   if (!gptApiKey || !gptHost) {
//     console.error('Missing API credentials');
//     return response.status(500).json({ error: "API key or host is missing in environment variables" });
//   }

//   try {
//     const { prompt }: RequestProps = request.body;

//     if (!prompt) {
//       return response.status(400).json({ error: "Prompt is required" });
//     }

//     console.log('Sending request to RapidAPI...');

//     const res = await fetch(gptUrl, {
//       method: "POST",
//       headers: {
//         'x-rapidapi-key': gptApiKey,
//         'x-rapidapi-host': gptHost,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         text: prompt,
//         width: WIDTH,
//         height: HEIGHT
//       }),
//     });

//     if (!res.ok) {
//       const errorText = await res.text();
//       console.error('RapidAPI Error:', res.status, errorText);
//       return response.status(res.status).json({ error: `Failed to fetch from API: ${errorText}` });
//     }

//     const data = await res.json();
//     console.log('RapidAPI Response:', data);

//     return response.status(200).json({
//       message: data?.generated_image || "https://via.placeholder.com/600x400?text=Generated+Image",
//     });
//   } catch (error) {
//     console.error("Error in API route:", error);
//     return response.status(500).json({ error: "Internal server error" });
//   }
// }

// export default handler

import { HEIGHT, WIDTH } from "@/constants";
import { RequestProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next"


const handler = async (request: NextApiRequest, response: NextApiResponse) => {
//   const gptApiKey = process.env.NEXT_PUBLIC_GPT_API_KEY;
  const gptApiKey = process.env.RAPIDAPI_KEY;
  const gptUrl = "https://chatgpt-42.p.rapidapi.com/texttoimage";

  if (!gptApiKey || !gptUrl) {
    return response.status(500).json({ error: "API key or URL is missing in environment variables" });
  }

  try {
    const { prompt }: RequestProps = request.body;

    const res = await fetch(gptUrl, {
      method: "POST",
      body: JSON.stringify({
        text: prompt,
        width: WIDTH,
        height: HEIGHT
      }),
      headers: {
        'x-rapidapi-key': gptApiKey.trim(),
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch from DALLE");
    }

    const data = await res.json();

    return response.status(200).json({
      message: data?.generated_image || "https://via.placeholder.com/600x400?text=Generated+Image",
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
}

export default handler