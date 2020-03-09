document.addEventListener("DOMContentLoaded", function() {

    let moods = ['Cheerful','Reflective','Gloomy','Anxious'];

    document.getElementById("mock-data").addEventListener("click", function () {

        for (let i = 0; i < 30; i++) {
            const accomplishment = new Accomplishment();
            accomplishment.summary = faker.lorem.lines(1);
            accomplishment.status = moods[faker.random.number(3)];
            accomplishment.details = faker.lorem.paragraph();
            accomplishment.date = faker.date.recent('30').getTime();
            accomplishment.favorite = faker.random.boolean();
            accomplishment.save();
        }

    });


});
