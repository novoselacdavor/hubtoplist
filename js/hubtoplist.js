(function($){
	// API url
	const apiURL = window.location.origin + '/hubtoplist/wp-json/wp/v2/hub-top-list';
	
	async function getAPI(url) {
		// Storing response
	    const apiResponse = await fetch(url);
	    
	    // Storing data in JSON
	    var data = await apiResponse.json();

	    // Sort data by position key value
	    if(data) {
	    	data.toplists[575] = data.toplists[575].sort((a, b) => a.position - b.position);
	    }

	    // Check if theres a response, if so, hide loading and pass data to render method
	    if(apiResponse) {
	    	// Hide loading animation
	        hideLoading();

	        // Call render method and pass api data
	        render(data.toplists[575]);
	    }
	    console.log(data.toplists[575]);
	}

	// Call getAPI to get the data
	getAPI(apiURL);

	// Hide loading animation method
	function hideLoading() {

		// Get element by class name and hide it
	    document.getElementsByClassName('hubTopList__loading')[0].style.display = 'none';
	}

	// Render api data
	function render(apiData) {
		// Vars
		let entry = '';

		// Looping through all elements of passed apiData, storing values and rendering them
		apiData.forEach((el) => {
			// Api data vars
			let reviewURL 	= window.location.origin + `/hubtoplist/${el.brand_id}`,
				logo 		= el.logo ? el.logo : 'No logo.',
				rating 		= el.info.rating ? el.info.rating : 'No rating.',
				bonus 		= el.info.bonus ? el.info.bonus : 'No bonus.',
				features 	= el.info.features ? el.info.features : null,
				playURL 	= el.play_url ? el.play_url : 'No play url.',
				terCon 		= el.terms_and_conditions ? el.terms_and_conditions : 'No terms and conditions.';

			// Render features method
			function renderFeatures(features) {
				// Vars
				let featuresData = '';

				// If there are no features, notify end user
				if(!features) {
					return 'No features added';
				}

				// Loop through features and return list of features
				features.forEach((feature) => {
					featuresData += `<p><span>&#10003;</span>${feature}</p>`;
				});

				return featuresData;
			}

			// Render star icons method
			function renderStars(numOfStars) {
				// Vars
				let filledStar 	= '<span class="star__icon--filled">&#9733;</span>',
					emptyStar  	= '<span class="star__icon--empty">&#9734;</span>',
					stars  		= '',
					counter 	= 1;

				// While loop will run 5 times ( 5 stars ) and based on rating will print out stars
				while(counter <= 5) {
					// We are checking for rating and based on it's value printing stars
					counter <= numOfStars ? stars += filledStar : stars += emptyStar
					// We have to increase our counter each time
					counter++;
				}

				// We are returning star icons
				return stars;
			}

			// Return entry with data for each entry in passed apiData
			return entry += `<div class="hubTopList__entry">
				<header class="hubTopList__data-header hubtoplist-paddingXY--x2">
				    <div>Casino</div>
				    <div>Bonus</div>
				    <div>Features</div>
				    <div>Play</div>
				</header>
				<div class="hubTopList__data-main hubtoplist-paddingXY--x2">
					<div class="hubTopList__entry-casino">
						<p>
							<a href="${reviewURL}">
								<img src="${logo}" alt="img-for-brandid-${el.brand_id}" />
							</a>
						</p>
						<p>
							<a href="${reviewURL}">Review</a>
						</p>
					</div>
					<div class="hubTopList__entry-bonus">
						<p>
							${renderStars(rating)}
						</p>
						<p>
							${bonus}
						</p>
					</div>
					<div class="hubTopList__entry-features">
						${renderFeatures(features)}
					</div>
					<div class="hubTopList__entry-play">
						<p>
							<a href="${playURL}">Play Now</a>
						</p>
						<p>
							${terCon}
						</p>
					</div>
				</div>
			</div>`;
		})

		// After we have done with everything, pass that to the HTML element
		document.getElementsByClassName('hubTopList__entries')[0].innerHTML = entry;
	}

})(jQuery);