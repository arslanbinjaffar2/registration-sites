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

    const jsonFromFile = require('public/mapplic_settings.json');
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
        mapHeight: floorPlan.image_height,
        title: floorPlan.floor_plan_name
      },
      locations: [],
      groups: []
    };

    floorPlanPins.forEach(pin => {
      const { id, type, exhibitor, sponsor, coordinateX, coordinateY } = pin;
      const categoryImage = getCategoryImage(pin);
      const detailLink= type === "exhibitor" ? `/${eventUrl}/exhibitors/${exhibitor.id}` : `/${eventUrl}/sponsors/${sponsor.id}`;
      const associatedGroups = getAssociatedGroups(pin);
      const subCategories = getSubCategories(pin);
      const categories = type === "exhibitor" ? exhibitor?.categories : sponsor?.categories;
      const firstCategory = categories ? categories[0] : null;

      newJson.locations.push({
        image: categoryImage,
        group: associatedGroups,
        id,
        cat_type: type,
        title: type === "exhibitor" ? exhibitor.name : sponsor.name,
        color: firstCategory ? firstCategory.color == '#ffffff' ? "rgb(var(--primaryrgb))" :firstCategory.color : "rgb(var(--primaryrgb))",
        zoom: "7.5113",
        layer: "first",
        desc: subCategories,
        coord: [coordinateX, coordinateY],
        about: type === "exhibitor" ? exhibitor.booth : sponsor.booth,
        link: detailLink,
        style: "marker",
        type: "pin2"
      });

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
      return pin.exhibitor?.logo ? `${baseUrl}/assets/exhibitors/${pin.exhibitor.logo}` : process.env.NEXT_APP_BASE_URL+'/img/exhibitors-default.png';
    } else if (pin.sponsor) {
      return  pin.sponsor?.logo ? `${baseUrl}/assets/sponsors/${pin.sponsor.logo}` : process.env.NEXT_APP_BASE_URL+'/img/exhibitors-default.png';
    }
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
        {event.eventsiteSettings.show_eventsite_breadcrumbs ? (
        <nav className="ebs-breadcrumbs mb-5" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a style={{ color: '#888' }} href={`/${eventUrl}`}>{event.labels?.FLOOR_PLAN_HOMEPAGE}</a></li>
            <li className="breadcrumb-item"><a style={{ color: '#888' }} href={`/${eventUrl}/floorplan/`}>{props.moduleName}</a></li>
            <li className="breadcrumb-item active" aria-current="page">{floorPlanDetails?.floorPlan?.floor_plan_name}</li>
          </ol>
        </nav>
        ) : null}
        {json.settings ?
          <Mapplic json={json} />
          : null}
      </div>
    </div>
  );
};

export default Variation1;
