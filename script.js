// Array de objetos -> Usuarios
let users = [
    {
        name: 'viviana',
        id: 123,
        pass: 741,
        user: 'admin'
    }, {
        name: 'andrea',
        id: 456,
        pass: 852,
        user: 'client'
    }, {
        name: 'mario',
        id: 789,
        pass: 963,
        user: 'client'
    }, {
        name: 'julio',
        id: 101,
        pass: 258,
        user: 'client'
    }
];

// Array de objetos -> Efectivo en cajero
let cash = [
    {
        value: 100000,
        amount: 0
    }, {
        value: 50000,
        amount: 0
    }, {
        value: 20000,
        amount: 0
    }, {
        value: 10000,
        amount: 0
    }, {
        value: 5000,
        amount: 0
    }
]

// Variable para contener el total del cajero
let totalAtm = 0;

// Funcion validacion de usuarios
function validateUser() {
    let flag = false;
    do {
        let id = Number(prompt('Ingrese id:'));
        let pass = Number(prompt('Ingrese contraseña:'));
        if (!!users.find(e => e.id === id) && !!users.find(e => e.pass === pass)) {
            flag = false;
            let user = users.find(e => e.id === id);
            return user.user;
        } else {
            alert('Error: Ingresa un id y contraseña valido!');
            flag = true;
        }
    } while (flag === true);

}

// Funcion para proceso de administrador
function doAdmin() {
    for (let e in cash) {
        let numBill = Number(prompt(`Cuantos billetes de ${cash[e].value} quieres cargar?`));
        cash[e].amount += numBill;
    }
    cashierAtm();
}

// Funcion para proceso de cliente
function doClient() {
    let div = 0;
    let bills = 0;
    let toGive = [];
    let given = 0;

    if (totalAtm === 0) {
        alert('Cajero en mantenimiento! por favor vuelva mas tarde');
    } else {
        let amount = Number(prompt('Cuando desea retirar?'));

        for (let e in cash) {
            if (amount > 0) {
                div = Math.floor(amount / cash[e].value);
                if (div > cash[e].amount) {
                    bills = cash[e].amount;
                } else {
                    bills = div;
                }
                toGive.push({ value: cash[e].value, amount: bills });
                amount -= (cash[e].value * bills);
                cash[e].amount -= bills;
            }
        }

        if (amount > 0) {
            alert('Error: Cantidad invalida');
        } else {
            for (let e in toGive) {
                if (toGive[e].amount > 0) {
                    given += (toGive[e].amount * toGive[e].value);
                    console.log(`${toGive[e].amount} billetes de $${toGive[e].value}`);
                }
            }
            alert(`Haz retirado ${given}`);
        }

    }
}

// Funcion para contar el efectivo en el cajero
function cashierAtm() {
    for (let e in cash) {
        console.log(`Hay ${cash[e].amount * cash[e].value} en billetes de ${cash[e].value}`);
        totalAtm += (cash[e].amount * cash[e].value);
    }
    console.log(`Total en cajero: $${totalAtm}`);
}

// Funcion general -> Cajero automatico
function atm() {
    let flag = false;
    do {
        if (validateUser() === 'admin') {
            doAdmin();
        } else {
            doClient();
            cashierAtm();
        }
        let goOn = prompt('Desea volver a utilizar el cajero?').toLowerCase();
        goOn === 'si' ? flag = true : flag = false;
    } while (flag);
}

// Boton que activa el funcionamiento del cajero
let btn = document.querySelector('.btn-atm');
btn.addEventListener('click', atm);