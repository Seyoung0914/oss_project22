import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      "http://openapi.seoul.go.kr:8088/58624c767a63796c37386a42726a66/xml/SeoulLibraryBookSearchInfo/1/40"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(response.data); 
  } catch (error) {
    console.error("Error in Serverless Function:", error.message);
    res.status(500).json({ error: "Failed to fetch data from OpenAPI" });
  }
}
