!function() {
  google.maps.event.addDomListener(window, 'load', initialize)

  function initialize() {
    get('/public/datasets/problem_landlords.json', function(response) {
      var chitown = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 41.8369, lng: -87.6847 },
        zoom: 11
      })

      for (var index = 0, length = response.data.length; index < length; ++index) {
        !function(i, datum) {
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(datum.lat, datum.long),
            map: chitown
          })

          var infowindow = new google.maps.InfoWindow({
            content: '<div class="info"><h3>' + datum.address + '</h3><p>' +
              datum.name + '</p></div>'
          })

          google.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.open(chitown, marker)
          })

          google.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close(chitown, marker)
          })
        }(index, response.data[index])
      }

      chitown.setOptions({
        styles: [
    {
        "featureType": "landscape",
        "stylers": [
            {
                "hue": "#F1FF00"
            },
            {
                "saturation": -27.4
            },
            {
                "lightness": 9.4
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "hue": "#0099FF"
            },
            {
                "saturation": -20
            },
            {
                "lightness": 36.4
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "stylers": [
            {
                "hue": "#00FF4F"
            },
            {
                "saturation": 0
            },
            {
                "lightness": 0
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "hue": "#FFB300"
            },
            {
                "saturation": -38
            },
            {
                "lightness": 11.2
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "hue": "#00B6FF"
            },
            {
                "saturation": 4.2
            },
            {
                "lightness": -63.4
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "hue": "#9FFF00"
            },
            {
                "saturation": 0
            },
            {
                "lightness": 0
            },
            {
                "gamma": 1
            }
        ]
    }
]
      })
    })
  }

  function get(url, callback) {
    var request = new XMLHttpRequest()
    request.open('GET', url, true)

    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        var response = JSON.parse(request.response)
        callback(response)
      }
    }
    request.send()
  }
}()
