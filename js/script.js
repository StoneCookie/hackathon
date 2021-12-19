// Это основное (НЕ ТРОГАТЬ)

let background = new Image();
background.src = "/media/map/map.png";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
canvas.width = background.width;
canvas.height = background.height;

canvas.addEventListener('click', function (event) {
    let x = event.pageX - (canvas.offsetLeft + canvas.clientLeft),
        y = event.pageY - (canvas.offsetTop + canvas.clientTop);

    boats.forEach(boat => {
        if(y > boat.y && y < boat.y + img.height && x > boat.x && x < boat.x + img.width){
            console.log(boat);
        }
    })
});

let img = new Image();
img.src = "/media/map/ship.png";


let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute('d', 'M 217.24956,13.578098 C 385.12857,289.67506 522.90251,376.0979 974.89054,83.136511 1397.4175,-297.2049 2107.1148,-448.39631 1634.0678,475.96556 c -37.8067,75.41885 -97.5824,119.78967 -151.9538,182.36067 -97.9326,112.70151 -212.9146,199.96864 -282.1642,276.83598 -58.8866,65.36439 -141.386,85.54839 -199.1971,120.65279 -62.36582,37.8701 -84.71306,91.1243 -133.11151,136.7724 -306.52946,649.0997 383.26271,1028.9147 897.42261,681.5746 270.6423,-141.7086 588.6196,-557.2025 668.1479,-768.2294 31.326,-83.123 17.9385,-124.26758 19.221,-150.72529 l 146.7967,-201.53788 c 156.333,-121.14375 198.6507,-137.72186 191.4212,-189.76665 -1.608,-11.57605 -1.4754,-30.29349 -2.2442,-47.04876 -2.2447,-48.92013 -1.684,-141.75652 27.7581,-239.54038 26.6014,-88.34914 74.5121,-147.78707 89.4454,-166.7879 53.2026,-67.693702 291.7611,-113.0118383 380.0499,-104.4732112 127.6511,12.3454572 326.7008,-10.1611312 401.9014,117.5488812 197.8503,251.31268 197.8206,463.34131 248.8521,635.9764 16.2737,55.05233 30.0735,106.0986 67.0946,153.13524 168.8434,139.66505 313.8072,355.38835 177.0879,495.98085 -55.2298,56.7945 -116.5788,105.8579 -205.2167,176.4344 -28.1678,44.304 -35.6554,70.4939 -35.9201,98.5871 -0.191,20.2736 -21.2768,55.7855 0.9535,79.896 108.9911,118.2094 83.4144,242.2391 -23.6263,309.7229 -90.6296,57.1375 -244.8117,56.1164 -394.0007,49.273 -37.806,-1.7342 -61.0578,-14.0575 -97.6924,-11.9935 -28.7028,22.0516 -55.6305,88.3651 -65.7643,293.2271');

let totalLength = path.getTotalLength();
console.log(totalLength);


let boats = [
    {
        uuid: 11,
        point: undefined,
        step: 0,
        forward: true,
        x: 0,
        y: 0,
        limit: 0,
        is_staying: 0,
    },
    {
        uuid: 49,
        point: undefined,
        step: 1000,
        forward: false,
        x: 0,
        y: 0,
        limit: 0,
        is_staying: 0,
    },
    {
        uuid: 166,
        point: undefined,
        step: 10000,
        forward: false,
        x: 0,
        y: 0,
        limit: 0,
        is_staying: 0,

    },
    {
        uuid: 177,
        point: undefined,
        step: 8000,
        forward: true,
        x: 0,
        y: 0,
        limit: 0,
        is_staying: 0,

    },
    {
        uuid: 17,
        point: undefined,
        step: 6500,
        forward: false,
        x: 0,
        y: 0,
        limit: 0,
        is_staying: 0,

    },
    {
        uuid: 3,
        point: undefined,
        step: 3500,
        forward: true,
        x: 0,
        y: 0,
        limit: 0,
        is_staying: 0,

    }
];

let station_img = new Image();
station_img.src = "media/map/station.png"

let stations = [
    {
        step: 3000,
        point: undefined,
        x: 20,
        y: -20,
    },
    {
        step: 10000,
        point: undefined,
        x: 85,
        y: 0,
    },
    {
        step: 5000,
        point: undefined,
        x: 25,
        y: -10,
    },
];

function makeStation() {
    stations.forEach(station => {
        let point = path.getPointAtLength(station.step);
        let x = (point.x / 3.6) - station.x;
        let y = (point.y / 3.7) - station.y;
        ctx.drawImage(station_img, x, y);
    });
}

function move() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    makeStation();
    boats.forEach(boat => {
        stations.forEach(station => {
            if (boat.step === station.step && boat.is_staying === 0) {
                boat.limit = 300;
                boat.is_staying = 1;
            }
        });
        boat.point = path.getPointAtLength(boat.step);
        boat.x = boat.point.x / 4;
        boat.y = boat.point.y / 4;
        ctx.drawImage(img, boat.x, boat.y);
        if (boat.limit > 0 && boat.is_staying === 1) {
            boat.limit--;
            ctx.fillStyle = "#202C80";
            ctx.font = "20px Montserrat";
            ctx.fillText("Остановка 5 мин", boat.x - 50, boat.y - 20);
        } else {
            boat.is_staying = 0;
            if (boat.forward) {
                boat.step++;
                if (boat.step >= totalLength) {
                    boat.forward = false;
                    boat.step--;
                }
            } else {
                boat.step--;
                if (boat.step < 0) {
                    boat.forward = true;
                    boat.step++;
                }
            }
        }

    });
    window.requestAnimationFrame(move);
}

move();