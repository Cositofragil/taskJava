async function obtenerData() {

    try {

        const response = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
        const externaldata = await response.json()
        return externaldata

    } catch (error) {

        console.log("error de API");

    };

};

async function paginaData() {

    try {

        const data = await obtenerData()

        let eventsSection = `
        <tr class="tr text-center">
            <td>Event with the highest percentage of attendance</td>
            <td>Event with the lowest percentage of attendance</td>
            <td>Event with larger capacity</td>
        </tr>
        `
        let upcomingSection = `
        <tr class="tr text-center">
            <td>Categories</td>
            <td>Revenues</td>
            <td>Percentage of attendance</td>
        </tr>`
        let pastSection = `
        <tr class="tr text-center">
            <td>Categories</td>
            <td>Revenues</td>
            <td>Percentage of attendance</td>
        </tr>`
        let upByCat = {}
        let pastByCat = {}
        let maxAttend = { "eventname": "", "attendance": -Infinity }
        let minAttend = { "eventname": "", "attendance": +Infinity }
        let maxCapacity = { "eventname": "", "capacity": -Infinity }

        data.events.forEach(event => {

            if (event.hasOwnProperty("assistance")) {

                let attendance = (event.assistance * 100) / event.capacity
                let revenue = event.assistance * event.price

                if (attendance >= maxAttend["attendance"]) {

                    maxAttend["eventname"] = event.name
                    maxAttend["attendance"] = attendance.toFixed(2)

                };

                if (attendance <= minAttend["attendance"]) {

                    minAttend["eventname"] = event.name
                    minAttend["attendance"] = attendance.toFixed(2)

                };



                if (pastByCat.hasOwnProperty(event.category)) {

                    pastByCat[event.category]["revenue"] += revenue
                    pastByCat[event.category]["attendance"] += attendance
                    pastByCat[event.category]["quantity"] += 1

                } else {

                    pastByCat[event.category] = { "revenue": revenue, "attendance": attendance, "quantity": 1 }

                };

            };

            if (event.hasOwnProperty("estimate")) {

                let attendance = ((event.estimate * 100) / event.capacity)
                let revenue = event.estimate * event.price

                if (upByCat.hasOwnProperty(event.category)) {

                    upByCat[event.category]["revenue"] += revenue
                    upByCat[event.category]["attendance"] += attendance
                    upByCat[event.category]["quantity"] += 1

                } else {

                    upByCat[event.category] = { "revenue": revenue, "attendance": attendance, "quantity": 1 }

                };

            };

            if (event.capacity > maxCapacity["capacity"]) {

                maxCapacity["eventname"] = event.name
                maxCapacity["capacity"] = event.capacity

            };

        });

        Object.keys(upByCat).forEach(category => {

            upcomingSection += `
            <tr class="tr-content text-center">
                <td>${category}</td>
                <td>${upByCat[category]["revenue"]}</td>
                <td>${(upByCat[category]["attendance"] / upByCat[category]["quantity"]).toFixed(2)} %</td>
            </tr>
            `;

        });

        Object.keys(pastByCat).forEach(category => {

            pastSection += `
            <tr class="tr-content text-center">
                <td>${category}</td>
                <td>${pastByCat[category]["revenue"]}</td>
                <td>${(pastByCat[category]["attendance"] / pastByCat[category]["quantity"]).toFixed(2)} %</td>
            </tr>
            `;

        });

        eventsSection += `
        <tr class="tr-content text-center">
            <td>${maxAttend["eventname"]} ${maxAttend["attendance"]} %</td>
            <td>${minAttend["eventname"]} ${minAttend["attendance"]} %</td>
            <td>${maxCapacity["eventname"]} ${maxCapacity["capacity"]}</td>
        </tr>
        `;

        document.getElementById("tbodyEvents").innerHTML = eventsSection
        document.getElementById("tbodyUp").innerHTML = upcomingSection
        document.getElementById("tbodyPast").innerHTML = pastSection

    } catch (error) {

        console.log(error);

    };

};

paginaData()