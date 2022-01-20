"use strict";
var car;
function submitCar() {
    var errores = 0;
    var plateInput = document.getElementById("plateInput");
    var brandInput = document.getElementById("brandInput");
    var colorInput = document.getElementById("colorInput");
    //EX1. Validar los campos de matricula, marca y color, antes de hacer el new Car
    // Validar cada campo por separado
    var plateError = document.getElementById('plateError');
    var brandError = document.getElementById('brandError');
    var colorError = document.getElementById('colorError');
    var plateFormat = /\d{4}[A-Z]{3}/i;
    if (plateInput.value.length > 0) {
        plateError.innerHTML = '';
        if (plateFormat.test(plateInput.value)) {
            plateError.innerHTML = '';
        }
        else {
            errores++;
            plateError.innerHTML = 'Formato matrículoa inválido, debe ser tipo 1234abc';
        }
    }
    else {
        errores++;
        plateError.innerHTML = 'Campo Matricula no puede estar vacio';
    }
    if (brandInput.value.length > 0) {
        brandError.innerHTML = '';
    }
    else {
        errores++;
        brandError.innerHTML = 'Campo Marca no puede estar vacio';
    }
    if (colorInput.value.length > 0) {
        colorError.innerHTML = '';
    }
    else {
        errores++;
        colorError.innerHTML = 'Campo Color no puede estar vacio';
    }
    if (errores === 0) {
        car = new Car(plateInput.value, colorInput.value, brandInput.value);
        showVehicle();
        showWheelForm();
    }
}
function showVehicle() {
    var carTitle = document.getElementById("carTitle");
    var plateOutput = document.getElementById("plateOutput");
    var brandOutput = document.getElementById("brandOutput");
    var colorOutput = document.getElementById("colorOutput");
    carTitle.innerText = "Car:";
    plateOutput.innerText = "Plate: " + car.plate;
    brandOutput.innerText = "Brand: " + car.brand;
    colorOutput.innerText = "Color: " + car.color;
}
function submitWheelForm() {
    var errores = 0;
    //EX2. Solo hacer el "new Wheel" si las 4 ruedas son correctas
    //EX3. Una rueda correcta deberá tener un diámetro entre 1 y 2. Crear una función para validarlas
    // Validar cada rueda por separado
    var wheelsInput = [];
    for (var i = 1; i <= 4; i++) {
        var brandWheel = (document.getElementById("brandWheel" + i));
        var diameterWheel = (document.getElementById("diameterWheel" + i));
        var errorBrand = (document.getElementById("errorBrandWheel" + i));
        var errorDiameter = (document.getElementById("errorDiameterWheel" + i));
        var diameter = Number(diameterWheel.value);
        var brand = brandWheel.value;
        if (brand.length === 0) {
            errores++;
            errorBrand.innerHTML = 'Campo Marca no puede estar vacio';
        }
        else {
            errorBrand.innerHTML = '';
        }
        if (diameterWheel.value.length === 0) {
            errores++;
            errorDiameter.innerHTML = 'Campo Diametro no puede estar vacio';
        }
        else {
            if (validateWheel(diameter)) {
                wheelsInput.push({ diameter: diameter, brand: brand });
                errorDiameter.innerHTML = '';
            }
            else {
                errores++;
                errorDiameter.innerHTML = 'Diametro debe ser entre 1 y 2';
            }
        }
    }
    if (errores === 0) {
        wheelsInput.forEach(function (wheel) {
            var wheel_generica = new Wheel(wheel.diameter, wheel.brand);
            car.addWheel(wheel_generica);
        });
        console.log(car);
        showWheels();
    }
}
function validateWheel(diameter) {
    if (diameter >= 1 && diameter <= 2) {
        return true;
    }
    return false;
}
function showWheels() {
    //EX4. Optimizar la función showWheels
    var wheelTitle = document.getElementById("wheelTitle");
    // let wheelOutput1 = <HTMLInputElement>document.getElementById("wheelOutput1");
    // let wheelOutput2 = <HTMLInputElement>document.getElementById("wheelOutput2");
    // let wheelOutput3 = <HTMLInputElement>document.getElementById("wheelOutput3");
    // let wheelOutput4 = <HTMLInputElement>document.getElementById("wheelOutput4");
    wheelTitle.innerText = "Wheels:";
    for (var i = 0; i <= car.wheels.length - 1; i++) {
        var wheelOutput = document.getElementById("wheelOutput" + i);
        wheelOutput.innerText = "Wheel ".concat(i, ": Brand: ").concat(car.wheels[i].brand, " Diameter: ").concat(car.wheels[i].diameter);
    }
    // wheelOutput1.innerText =
    //     "Wheel 1:  " +
    //     "Brand: " +
    //     car.wheels[0].brand +
    //     "  Diameter: " +
    //     car.wheels[0].diameter;
    // wheelOutput2.innerText =
    //     "Wheel 2:  " +
    //     "Brand: " +
    //     car.wheels[1].brand +
    //     "  Diameter: " +
    //     car.wheels[1].diameter;
    // wheelOutput3.innerText =
    //     "Wheel 3:  " +
    //     "Brand: " +
    //     car.wheels[2].brand +
    //     "  Diameter: " +
    //     car.wheels[2].diameter;
    // wheelOutput4.innerText =
    //     "Wheel 4:  " +
    //     "Brand: " +
    //     car.wheels[3].brand +
    //     "  Diameter: " +
    //     car.wheels[3].diameter;
}
function showWheelForm() {
    var carForm = document.getElementById("create-car-form");
    var carWheel = document.getElementById("create-wheel-form");
    carForm.style.display = "none";
    carWheel.style.display = "block";
}
