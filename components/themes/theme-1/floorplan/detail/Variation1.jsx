import React, { useEffect, useState } from "react";
import Mapplic from 'components/mapplic/Mapplic';
import { floorPlanDetailSelector, fetchFloorPlanDetails, clearState } from "store/Slices/FloorPlanDetailSlice";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';

const Variation1 = (props) => {
  const { event } = useSelector(eventSelector);
  const eventUrl = event.url;
  const dispatch = useDispatch();
  const { floorPlanDetails, labels, loading, error } = useSelector(floorPlanDetailSelector);
  const [json, setJson] = useState({});

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch(fetchFloorPlanDetails(eventUrl, id));
    return () => {
      dispatch(clearState());
    }
  }, []);

  useEffect(() => {
    if (!floorPlanDetails?.floorPlanPins) return;

    const jsonFromFile = require('../../../../../public/data.json');
    const { floorPlan, floorPlanPins } = floorPlanDetails;

    const newJson = {
      ...jsonFromFile,
      layers: [{
        id: "first",
        name: floorPlan.floor_plan_name,
        file: `${process.env.NEXT_APP_EVENTCENTER_URL}/assets/floorplans/${floorPlan.image}`,
        mapWidth: floorPlan.image_width,
        mapHeight: floorPlan.image_height
      }],
      settings: {
        ...jsonFromFile.settings,
        mapWidth: floorPlan.image_width,
        mapHeight: floorPlan.image_height
      },
      locations: [],
      groups: []
    };

    floorPlanPins.forEach(pin => {
      const { id, type, exhibitor, sponsor, coordinateX, coordinateY } = pin;
      const categoryImage = getCategoryImage(pin);
      const associatedGroups = getAssociatedGroups(pin);
      const subCategories = getSubCategories(pin);

      newJson.locations.push({
        image: categoryImage,
        group: associatedGroups,
        id,
        cat_type: type,
        title: type === "exhibitor" ? exhibitor.name : sponsor.name,
        color: "#002F65",
        zoom: "7.5113",
        layer: "first",
        desc: subCategories,
        coord: [coordinateX, coordinateY],
        about: "44",
        link: categoryImage,
        style: "marker",
        type: "pin2"
      });

      const categories = type === "exhibitor" ? exhibitor?.categories : sponsor?.categories;

      if (categories) {
        categories.forEach(category => {
          const existingGroup = newJson.groups.find(group => group.id === category.id && group.type === type);
          if (!existingGroup) {
            newJson.groups.push({
              id: category.id,
              name: category.info[0].value,
              color: category.color,
              type
            });
          }
        });
      }
    });

    console.log('newJson:', newJson);
    setJson(newJson);
  }, [floorPlanDetails]);

  function getSubCategories(pin) {
    const subCategories = pin.exhibitor?.categories || pin.sponsor?.categories || [];
    return subCategories.map(subCategory => {
      return `<p class='ebs-category-json'><em class='rounded-circle d-inline-block' style='background-color: ${subCategory.color}; width: 10px; height: 10px;'></em>${subCategory.info[0].value}</p>`;
    }).join("");
  }

  function getCategoryImage(pin) {
    const baseUrl = process.env.NEXT_APP_EVENTCENTER_URL;
    if (pin.exhibitor) {
      return `${baseUrl}/assets/exhibitors/${pin.exhibitor.logo}`;
    } else if (pin.sponsor) {
      return `${baseUrl}/assets/sponsors/${pin.sponsor.logo}`;
    }
    return "https://stage.eventbuizz.com/_admin_assets/images/sponsor-placeholder.png";
  }

  function getAssociatedGroups(pin) {
    const groups = [];
    pin.exhibitor?.categories?.forEach(category => {
      groups.push(category.id);
    });
    pin.sponsor?.categories?.forEach(category => {
      groups.push(category.id);
    });
    return groups.join(",");
  }


  return (
    <div className="edgtf-container ebs-default-padding">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="ebs-breadcrumbs mb-5" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a style={{ color: '#888' }} href="#">Home</a></li>
            <li className="breadcrumb-item"><a style={{ color: '#888' }} href="#">Program</a></li>
            <li className="breadcrumb-item active" aria-current="page">Floor plan</li>
          </ol>
        </nav>
        {json.locations && json.locations.length > 0 && <Mapplic json={json} />}
      </div>
    </div>
  );
};

export default Variation1;
