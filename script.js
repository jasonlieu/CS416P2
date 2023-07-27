let currentSlide = 0;

function showSlide(slideIndex) {
    const slideContainer = d3.select(".slide-container");
    const slides = d3.selectAll(".slide");
    const slideWidth = slideContainer.node().clientWidth / slides.size();
    const transformX = -slideIndex * slideWidth;
    slideContainer.style("transform", `translateX(${transformX}px)`);

    const navigationBelt = d3.select("#navigationBelt");
    const indicators = navigationBelt.selectAll(".indicator");
    indicators.classed("active", (d, i) => i === slideIndex);
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    showSlide(currentSlide);
}

document.addEventListener("DOMContentLoaded", function() {
    const slideContainer = d3.select(".slide-container");
    const navigationBelt = d3.select("#navigationBelt");
    const slides = d3.selectAll(".slide");

    showSlide(currentSlide);
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight" && currentSlide < slides.size() - 1) {
            goToSlide(currentSlide + 1);
        } else if (event.key === "ArrowLeft" && currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    });

    const navButtons = navigationBelt.selectAll(".indicator");
    navButtons.each(function (d, i) {
        d3.select(this).on("click", function () {
            goToSlide(i);
        });
    });
});
