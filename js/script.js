function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}


whenDocumentLoaded(() => {
  console.log("Start of the page");

  alert("You will see a Data visualisation project about: Natural Resilience in the Amazon.\
  You will be able to interact with the data by using the toolbox.")
});
