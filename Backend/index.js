import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

const HEADERS = {
  "User-Agent": "Mozilla/5.0",
  Accept: "application/json"
};

// 🔥 RESTAURANT LIST API
app.get("/api/restaurants", async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const response = await axios.get(
      "https://www.swiggy.com/dapi/restaurants/list/v5",
      {
        params: {
          lat,
          lng,
          "is-seo-homepage-enabled": true,
          page_type: "DESKTOP_WEB_LISTING"
        },
        headers: HEADERS
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Restaurant fetch failed" });
  }
});

// 🔥 RESTAURANT MENU API
app.get("/api/menu/:restId", async (req, res) => {
  const { restId } = req.params;
  const { lat, lng } = req.query;

  try {
    const response = await axios.get(
      "https://www.swiggy.com/mapi/menu/pl",
      {
        params: {
          "page-type": "REGULAR_MENU",
          "complete-menu": true,
          lat,
          lng,
          restaurantId: restId
        },
        headers: HEADERS
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Menu fetch failed" });
  }
});

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
