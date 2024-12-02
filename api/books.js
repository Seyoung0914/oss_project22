import axios from "axios";

export default async function handler(req, res) {
  try {
    // 쿼리에서 start와 end 값을 받아옵니다. 기본값은 1~40으로 설정합니다.
    const { start = 1, end = 40 } = req.query;

    // start와 end가 숫자가 아닌 경우 에러 처리
    const startIndex = parseInt(start, 10);
    const endIndex = parseInt(end, 10);

    if (isNaN(startIndex) || isNaN(endIndex) || startIndex <= 0 || endIndex <= 0) {
      return res.status(400).json({ error: "Invalid range parameters. Must be positive integers." });
    }

    // 요청 범위를 1000으로 제한
    const adjustedEnd = Math.min(endIndex, 1000);

    console.log(`Fetching data from API: range ${startIndex}-${adjustedEnd}`);

    const response = await axios.get(
      `http://openapi.seoul.go.kr:8088/58624c767a63796c37386a42726a66/xml/SeoulLibraryBookSearchInfo/${startIndex}/${adjustedEnd}`
    );

    res.setHeader("Access-Control-Allow-Origin", "*"); // CORS 헤더 추가
    res.status(200).send(response.data); // API에서 받은 데이터를 그대로 반환
  } catch (error) {
    console.error("Error in Serverless Function:", error.message);
    res.status(500).json({ error: "Failed to fetch data from OpenAPI" });
  }
}
