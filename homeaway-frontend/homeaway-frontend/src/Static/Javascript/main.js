let slide=document.querySelectorAll(".slider-imgs")
let nxtb=document.querySelector(".next")
let preb=document.querySelector(".previous")

console.log(slide)

let slideIndex=0
setInterval(
    function(){
        slide[slideIndex].classList.remove("slider-active")
        slideIndex++
        if(slideIndex>=slide.length){
            slideIndex=0
        }
            // if(slide[slideIndex].classList.contains("slider-active")){
            // }
            // console.log(slide.length)
            console.log(slideIndex)
            slide[slideIndex].classList.add("slider-active")
    },4000)


nxtb.addEventListener("click",function(){
    slide[slideIndex].classList.remove("slider-active")
    slideIndex++
    if(slideIndex>=slide.length){
        slideIndex=0
    }
        // if(slide[slideIndex].classList.contains("slider-active")){
        // }
        // console.log(slide.length)
        console.log(slideIndex)
        slide[slideIndex].classList.add("slider-active")
}

)

// slideIndex=slide.length
// preb.addEventListener("click",function(){
//     slide[slideIndex].classList.remove("slider-active")
//     slideIndex--
//     if(slideIndex>=slide.length){
//         slideIndex=0
//     }
//         // if(slide[slideIndex].classList.contains("slider-active")){
//         // }
//         // console.log(slide.length)
//         console.log(slideIndex)
//         slide[slideIndex].classList.add("slider-active")
// })


