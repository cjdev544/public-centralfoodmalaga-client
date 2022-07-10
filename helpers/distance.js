export const distance = async (destination) => {
  if (typeof window !== 'undefined') {
    const origin = { lat: 10.471599365443314, lng: -66.95680455688138 }

    const services = new google.maps.DistanceMatrixService()

    const request = {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    }

    try {
      const response = await services.getDistanceMatrix(request)

      response.rows[0].elements.forEach((element) => {
        const distanceString = element.distance.text.split(' ', 1)[0]
        const distNumber = distanceString.replace(',', '.')

        if (distNumber > 10) {
          console.log(element, 'NO SE PUEDE')
          return null
        }

        console.log(element, 'SI SE PUEDE')
        return {
          ok: true,
          address: response.destinationAddresses,
          distance: element.distance.text.split(' ', 1)[0],
          duration: element.duration.text.split(' ', 1)[0],
        }
      })
    } catch (err) {
      console.log(err)
      return null
    }

    // .getDistanceMatrix(request)
    // .then((response) => {
    //   console.log(response, "MATRIX");
    //   return response;
    // })
    // .catch((err) => {
    //   console.log(err);
    //   return null;
    // });
  }
}
