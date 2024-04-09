const container = document.querySelector(".months-container");
let monthLists = "";

function fetchMonths() {
    fetch("MyanmarMonths.json")
        .then(res => res.json())
        .then(data => {
            console.log(data.Tbl_Months[0].Id)
            for (let i = 0; i < data.Tbl_Months.length; i++) {
                monthLists += `
                <!-- *card start -->
                <div class="card" onclick="monthDetail(${data.Tbl_Months[i].Id})">
                    <div class="card-img">
                        <img src="../img/${data.Tbl_Months[i].Id}.jpg" alt="" class="month-card">
                        <div class="hoverImg">
                            <img src="../img/${data.Tbl_Months[i].Id}Design.jpeg" alt="" class="design-img">
                        </div>
                    </div>
                    <h3 class="month-title">${data.Tbl_Months[i].MonthMm}</h3>
                </div>
                <!-- *card end -->
                `
            }
            container.innerHTML = monthLists

            // *pagination
            const prev = document.querySelector(".prev");
            const next = document.querySelector(".next");
            const page = document.querySelector(".pageNum");
            const month = document.querySelector(".months-container").children;
            const maxItem = 4;
            let index = 1;
            let pagination = Math.ceil(month.length / maxItem);

            prev.addEventListener("click", () => {
                index--;
                check();
                showMonth();
            })
            next.addEventListener("click", () => {
                index++;
                check();
                showMonth();
            })

            function check() {
                if (index === pagination) {
                    next.classList.add("disabled");
                } else {
                    next.classList.remove("disabled")
                }
                if (index === 1) {
                    prev.classList.add("disabled");
                } else {
                    prev.classList.remove("disabled")
                }
            }

            function showMonth() {
                for (let i = 0; i < month.length; i++) {
                    month[i].classList.remove("show");
                    month[i].classList.add("hide");
                    if (i >= (index * maxItem) - maxItem && i < index * maxItem) {
                        month[i].classList.remove("hide");
                        month[i].classList.add("show");
                    }
                    page.innerHTML = index;
                }
            }
            showMonth();
            check();
        })
}
fetchMonths();

function monthDetail(id) {
    fetch("MyanmarMonths.json")
        .then(res => res.json())
        .then(data => {
            document.body.style.backgroundColor = "white";
            for (let i = 0; i < data.Tbl_Months.length; i++) {
                if (id === data.Tbl_Months[i].Id) {
                    document.querySelector(".container").innerHTML = `
                        <div class= "result-container">
                            <div class="title-info">
                                <h4>${data.Tbl_Months[i].MonthMm} (${data.Tbl_Months[i].MonthEn})</h4>
                                <h4>${data.Tbl_Months[i].FestivalMm} (${data.Tbl_Months[i].FestivalEn})</h4>
                                <a href="home.html"><button class="back-btn">Back</button></a>
                            </div>
                            <div class="month-about">
                                <div class="month-descri">
                                    <div class="monthImg">
                                        <img src = "${data.Tbl_Months[i].Image}">
                                    </div>
                                    <div class="desc">
                                        <p>${data.Tbl_Months[i].Description}</p>
                                    </div>
                                </div>
                                <div class="month-detail">
                                    <p>${data.Tbl_Months[i].Detail}</p>
                                </div>
                            </div>
                        </div>
                    `
                }
            }
        })
}

// *setting toggle

document.querySelector("#setting").addEventListener("click", () => {
    document.querySelector(".setting-box").classList.toggle("active");
})

let imgaes = document.querySelectorAll(".setting-box img");
imgaes.forEach((img) => {
    img.addEventListener("click", () => {
        imgaes.forEach((imgae) => {
            imgae.style.opacity = "1";
        })
        document.querySelector(".landing-img").src = img.src;
        img.style.opacity = "0.5";
    })
})

// *right arrow
document.querySelector("#landing").addEventListener("mouseover", () => {
    document.querySelector(".arrow").classList.add("active-link");
})
document.querySelector("#landing").addEventListener("mouseout", () => {
    document.querySelector(".arrow").classList.remove("active-link");
})