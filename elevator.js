const doorOpenSpeed = 1;

class Elevator {
    constructor() {
        Elevator.prototype.currentFloor = 1;
        Elevator.prototype.speed = 1;
        Elevator.prototype.doorOpenTime = 1;
        Elevator.prototype.doorsOpen = false;
        Elevator.prototype.isMoving = false;
        Elevator.prototype.availableFloors = Array.from({ length: 5 }, (min, max) => max + 1);    //use {length-1} while using this.opendoors()

        // function for opening the door
        // this.openDoors = function (doors) {
        Elevator.prototype.openDoors = function (doors) {
            for (let i = 0; i < doors.length; i++)
                doors[i].classList.add(doors[i].id + "-moved");
            Elevator.prototype.doorsOpen = true;
        };

        // function for closing the door
        // this.closeDoors = function (doors) {
        Elevator.prototype.closeDoors = function (doors) {
            for (let i = 0; i < doors.length; i++)
                doors[i].classList.remove(doors[i].id + "-moved");
            Elevator.prototype.doorsOpen = false;
        };

        // Elevator.prototype.shiftElevatorUp = function (elevatorBody, requestedFloor) { 
        //     moveByPixel = requestedFloor * 205 + "px"                 //new addition
        //     elevatorBody.style.transform = translateY(moveByPixel);
        // }

        // Elevator.prototype.shiftElevatorDown = function (pixels) {

        // }

        // transform: translateY(multiple of(-205px))
        // default lift position at 1st floor => 0px
        //                         at 2nd floor => -205px
        //                         at 3rd floor => -410px
        //                         at 4th floor => -615px
    }
}

class Panel {
    constructor(elevator) {
        let go = document.querySelector("#go");
        let stop = document.querySelector("#stop");                             // new modification
        let inputButtons = document.querySelectorAll(".panel-input-button");

        Panel.prototype.updateDisplay = function (floor) {
            let floorNumber = document.querySelector("#floor-number");
            floorNumber.innerText = floor;
        };
        Panel.prototype.displayInput = function (button) {
            let display = document.querySelector("#panel-display");
            display.innerText = button.id;
        };

        Panel.prototype.pauseInput = function () {
            elevator.isMoving = false;
            let arrivalNotification = document.querySelector("#arrived-notification");
            arrivalNotification.innerText = "*";
        };

        // Panel.prototype.stopElevator = function() {                             //new addition
        //     elevator.isMoving = false;
        //     // let stoplift = document.querySelector("#elevator");
        //     // stoplift.innerText = 
        // }

        // Panel.prototype.shiftElevatorUp = function (elevatorBody, requestedFloor) {                           //new addition
        //     elevatorBody.style.transform = translateY((-205 + "px") * requestedFloor);
        // }

        Panel.prototype.moveElevator = function () {
            let requestedFloor = document.querySelector("#panel-display").innerText;
            if (!elevator.isMoving) {
                if (requestedFloor in elevator.availableFloors) {
                    if (requestedFloor != elevator.currentFloor) {
                        elevator.isMoving = true;
                        let arrivalNotification = document.querySelector("#arrived-notification");
                        let upArrow = document.querySelector("#up-arrow");
                        let downArrow = document.querySelector("#down-arrow");
                        arrivalNotification.innerText = "";
                        Panel.prototype.updateDisplay(requestedFloor);

                        if (requestedFloor > elevator.currentFloor) {
                            upArrow.classList.remove("hide");
                            downArrow.classList.add("hide");
                        }
                        else {
                            downArrow.classList.remove("hide");
                            upArrow.classList.add("hide");
                        }   

                        let travelTime = Math.abs(requestedFloor - elevator.currentFloor) *
                            (elevator.speed * 1000) +
                            doorOpenSpeed * 1000 +
                            elevator.doorOpenTime * 1000;
                        let arrivalTime = travelTime;

                        setTimeout(Panel.prototype.pauseInput.bind(Panel.prototype), travelTime);
                        elevator.currentFloor = requestedFloor;
                        let elevatorDoors = document.querySelectorAll(".elevator-door");                
                        
                        // let elevatorBody = document.querySelector("#elevator");                         //for moving the lift
                        elevator.openDoors(elevatorDoors);                         
                        setTimeout(elevator.closeDoors.bind(Panel.prototype, elevatorDoors), elevator.doorOpenTime * 1000); 
                        // elevator.shiftElevator(pixels);                             //fix this  
                        // setTimeout(elevator.shiftElevator.bind(Panel.prototype, elevatorBody), arrivalTime);             //move_elevator
                        setTimeout(elevator.openDoors.bind(Panel.prototype, elevatorDoors), arrivalTime);                   
                        setTimeout(elevator.closeDoors.bind(Panel.prototype, elevatorDoors),                               
                            arrivalTime + elevator.doorOpenTime * 1000);
                    }
                }
            }
        };

        go.addEventListener("click", Panel.prototype.moveElevator.bind(Panel.prototype), true);
        for (let i = 0; i < inputButtons.length; i++)
            inputButtons[i].addEventListener("click", Panel.prototype.displayInput.bind(Panel.prototype, inputButtons[i]), true);
        // complete the lift stopping mechanism
        // stop.addEventListener("click", Panel.prototype.stopElevator.bind(Panel.prototype), false);

    }
}

let elevator = new Elevator();
let panel = new Panel(elevator);

//Elevator button - > click event id, if presentFlooor!- id movebY = 205* "px" tranform . 
// x.getBoundingClientRect()

// for lateral movement of the elevator using pixel
// let startLift = 86;
// let endLift = 86;
// let id = null;
// let stopVar = 86;

// let array = [86, 196, 306, 416, 526];

// let buttonEvent = document.querySelectorAll('.btn');

// buttonEvent.forEach(element => {
//     if(element.id != "stop"){
//         document.getElementById(`${element.id}`).addEventListener("click", function(){move(`${element.id}`)});
//     }
//     else{
//         document.getElementById("stop").addEventListener("click", function() {
//             let endStop = stopVar;
//             clearInterval(id);
//             endLift = endStop;
//         });
//     }
// })

// function move(idValue){
//     startLift = endLift;
//     let end = array[idValue - 1]
//     let LiftMove = end - startLift;*
//     let start = document.getElementById("elevator");
//     animation(startLift, end, LiftMove, start);
//     endLift = end;
// }

// function animation (start, end, move, start1){
//     let position = start;
//     clearInterval(id);
//     id = setInterval(() => {
//         if (position == end) {
//             clearInterval(id);
//         } else {
//             if (move < 0) {
//                 position--;
//             } else {
//                 position++;
//             }
//             stopVar = position;
//             start1.style.bottom = position + "px";
//         }

//     }, 14);
// }

// function liftToFloorOne() {
//     startLift = endLift;

//     let end1 = document.getElementById("one").value;

//     let liftMove = end1 - startLift;

//     let start1 = document.getElementById("elevator");

//     animation(startLift, end1, liftMove, start1);

//     endLift = end1;
// }

// function liftToFloorTwo() {

//     startLift = endLift;

//     let end2 = document.getElementById("two").value;

//     let liftMove = end2 - startLift;

//     let start2 = document.getElementById("elevator");

//     animation(startLift, end2, liftMove, start2);

//     endLift = end2;

// }

// function liftToFloorThree() {

//     startLift = endLift;

//     let end3 = document.getElementById("three").value;

//     let liftMove = end3 - startLift;

//     let start3 = document.getElementById("elevator");

    
//     animation(startLift, end3, liftMove, start3);

//     endLift = end3;
// }

// function liftToFloorFour() {

//     startLift = endLift;

//     let end4 = document.getElementById("four").value;

//     let liftMove = end4 - startLift;

//     let start4 = document.getElementById("elevator");

    
//     animation(startLift, end4, liftMove, start4);
//     endLift = end4;
// }

// function liftToFloorFive() {

//     startLift = endLift;

//     let end5 = document.getElementById("five").value;

//     let liftMove = end5 - startLift;

//     let start5 = document.getElementById("elevator");
    

//     animation(startLift, end5, liftMove, start5);
//     endLift = end5;
// }

// function stop() {
//     let endStop = stopVar;
//     clearInterval(id);
//     endLift = endStop;
// }
