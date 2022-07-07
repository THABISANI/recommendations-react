import React, {useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Recommendations() {
  const [details, setDetails] = useState(
    {size:0,
      restaurant:"KFC"
  });
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  const getRecommendations = async () => {
      const url = `http://13.246.94.41/recommendations?restaurant=${details.restaurant}&size=${details.size}`;
      try {
        console.log(url);
        const response = await axios.get(url);
        console.log(response);
        let data = response.data ? response.data.recommended_restaurants : [];
        setRecommendations(data);
      } catch (error) {
        console.log(error);
      }
  };

  const submitHandler = e => {
      e.preventDefault();
      //Create images in S3
      getRecommendations();
  }
  return (
    <div className="row">
      <div className="col-6">
        <form onSubmit={submitHandler} className="create-recommendation-form">
          <div className="form-inner">
              <div className="form-group">
                  <label htmlFor="restaurant">Familiar Restaurant:</label>
                  <input type="text" name="restaurant" id="restaurant" onChange={e => setDetails({...details, restaurant: e.target.value})} value={details.restaurant}/>
              </div>
              <div className="form-group">
                  <label htmlFor="size">Number of Recommendations:</label>
                  <input type="text" name="size" id="size" onChange={e => setDetails({...details, size: e.target.value})} value={details.size}/>
              </div>
              <input type="submit" value="Get Recommendations"/>
          </div>
        </form>
      </div>
        <div className="form-inner recommendation-list">
          {recommendations.map((recommendation, index) => (
                <div className='image-container d-flex justify-content-center m-3 row' key={index}>
                  <div className="recommendation-image"><img className="recommendation-image" src={require('../images/food_image.jpeg')} alt='logo' /></div>
                  <div>
                      <span ><br/><strong>Id: </strong>{recommendation.id}<br/><strong>Name</strong>: {recommendation.bna}</span>
                  </div>
                </div>
            ))}
      </div>
    </div>
  )
}

export default Recommendations;
