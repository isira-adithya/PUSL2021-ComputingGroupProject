import express from "express";
import axios from "axios";
import config from '../../../config.js';
const router = express.Router();

router.get("/geocode", async (req, res) => {
    try {
        // const response = await axios.get("https://api.geoapify.com/v1/geocode/search?text=" + req.query['address'] + "&apiKey=" + config.GEOAPIFY_API_KEY)
        // res.json({
        //     success: true,
        //     data: response.data
        // })

        // Mock response
        res.json({
            success: true,
            data: {
                "success": true,
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                            "type": "Feature",
                            "properties": {
                                "datasource": {
                                    "sourcename": "openstreetmap",
                                    "attribution": "© OpenStreetMap contributors",
                                    "license": "Open Database License",
                                    "url": "https://www.openstreetmap.org/copyright"
                                },
                                "name": "Lunugala",
                                "country": "Sri Lanka",
                                "country_code": "lk",
                                "state": "Uva Province",
                                "county": "Badulla District",
                                "city": "Lunugala",
                                "lon": 81.2021768,
                                "lat": 7.0419405,
                                "result_type": "city",
                                "distance": 0,
                                "formatted": "Lunugala, Uva Province, Sri Lanka",
                                "address_line1": "Lunugala",
                                "address_line2": "Uva Province, Sri Lanka",
                                "category": "populated_place",
                                "timezone": {
                                    "name": "Asia/Colombo",
                                    "offset_STD": "+05:30",
                                    "offset_STD_seconds": 19800,
                                    "offset_DST": "+05:30",
                                    "offset_DST_seconds": 19800
                                },
                                "plus_code": "6MV326R2+QV",
                                "rank": {
                                    "importance": 0.2746177363283244,
                                    "popularity": 0.7632098437070163,
                                    "confidence": 0.25,
                                    "confidence_city_level": 1,
                                    "match_type": "match_by_city_or_disrict"
                                },
                                "place_id": "51a300f676f04c544059f5824f73f22a1c40f00103f901d006f97300000000c002089203084c756e7567616c61"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    81.2021768,
                                    7.0419405
                                ]
                            },
                            "bbox": [
                                81.1621768,
                                7.0019405,
                                81.2421768,
                                7.0819405
                            ]
                        },
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    81.195511,
                                    7.039949
                                ]
                            },
                            "properties": {
                                "country_code": "lk",
                                "name": "Lunugala",
                                "country": "Sri Lanka",
                                "county": "Lunugala",
                                "datasource": {
                                    "sourcename": "whosonfirst",
                                    "url": "https://www.whosonfirst.org/docs/licenses/"
                                },
                                "state": "Badulla",
                                "lon": 81.195511,
                                "lat": 7.039949,
                                "result_type": "county",
                                "formatted": "Lunugala, Sri Lanka",
                                "address_line1": "Lunugala",
                                "address_line2": "Sri Lanka",
                                "timezone": {
                                    "name": "Asia/Colombo",
                                    "offset_STD": "+05:30",
                                    "offset_STD_seconds": 19800,
                                    "offset_DST": "+05:30",
                                    "offset_DST_seconds": 19800
                                },
                                "plus_code": "6MV325QW+X6",
                                "rank": {
                                    "popularity": 0.7632098437070163,
                                    "confidence": 0,
                                    "match_type": "match_by_country_or_state"
                                },
                                "place_id": "5187c09140834c54405918080264e8281c40c002099203084c756e7567616c61e2031d77686f736f6e66697273743a636f756e74793a31303932303631383737"
                            },
                            "bbox": [
                                81.106482,
                                6.955537,
                                81.246915,
                                7.10636
                            ]
                        }
                    ],
                    "query": {
                        "text": "No 21, Pallepanguwa Road, Lunugala",
                        "parsed": {
                            "housenumber": "no 21",
                            "street": "pallepanguwa road",
                            "city": "lunugala",
                            "expected_type": "building"
                        }
                    }
                }
            }
        })
    } catch (err) {
        res.status(500);
        return res.json({
            success: false,
            msg: "Internal Server Error"
        })
    }
});

export default router;