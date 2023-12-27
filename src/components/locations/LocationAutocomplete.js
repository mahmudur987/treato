import React, { useState } from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import useOnclickOutside from "react-cool-onclickoutside";
  import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const LocationAutocomplete = () => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete({
        callbackName: "YOUR_CALLBACK_NAME",
        requestOptions: {
          /* Define search scope here */
        },
        debounce: 300,
      });
      const ref = useOnclickOutside(() => {
        // When the user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
      });
    
      const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
      };
    
      const handleSelect =
        ({ description }) =>
        () => {
          // When the user selects a place, we can replace the keyword without request data from API
          // by setting the second parameter to "false"
          setValue(description, false);
          clearSuggestions();
    
          // Get latitude and longitude via utility functions
          getGeocode({ address: description }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            console.log("📍 Coordinates: ", { lat, lng });
          });
        };
    
      const renderSuggestions = () =>
        data.map((suggestion) => {
          const {
            place_id,
            structured_formatting: { main_text, secondary_text },
          } = suggestion;
    
          return (
            <li key={place_id} onClick={handleSelect(suggestion)}>
              <strong>{main_text}</strong> <small>{secondary_text}</small>
            </li>
          );
        });
    
        const containerStyle = {
          width: "100%",
          height: "400px",
        };
      
        const center = {
          lat: 0, // Default to 0
          lng: 0, // Default to 0
        };
      return (
        <div ref={ref} style={{height:"90vh",padding:"10rem"}}>
          <input
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Where are you going?"
          />
          {/* We can use the "status" to decide whether we should display the dropdown or not */}
          {status === "OK" && <ul>{renderSuggestions()}</ul>}
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{ lat: 19.2856, lng: 72.8691 }}
              zoom={15}
            >
              <Marker position={{ lat: 19.2856, lng: 72.8691 }} />
            </GoogleMap>
        </div>
      );
      }
export default LocationAutocomplete;
