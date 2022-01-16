const {createDeveloperCard} = require('../script/сreateContent')

describe('createDeveloperCard', () => {
    test('create basic card', () => {
        expect(createDeveloperCard({
            "photo": "http://127.0.0.1:3050/photo/1642255583693developerPhoto.jpg",
            "name": "Nikita Bezdelnikov",
            "position": "Team Lead",
            "height": 189,
            "age": 39,
            "eyeColor": "Blue",
            "exp": 10,
            "motherTongue": "Russian",
            "placeOfBirth": "Horlivka",
            "hobby": "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual('<li class="developers-list__item"><div class="profile"><div class="profile__img" style="background-image: url(http://127.0.0.1:3050/photo/1642255583693developerPhoto.jpg)"></div><p class="profile__name">Nikita Bezdelnikov</p><p class="profile__position">Team Lead</p><div class="profile__info"><ul class="stats-list"><li class="stats-list__item stat"><p class="stat__title">Height: &nbsp;</p><p class="stat__text">189</p></li><li class="stats-list__item stat"><p class="stat__title">Age: &nbsp;</p><p class="stat__text info-holder">39</p></li><li class="stats-list__item stat"><p class="stat__title">Eye color: &nbsp;</p><p class="stat__text info-holder">Blue</p></li><li class="stats-list__item stat"><p class="stat__title">Experience: &nbsp;</p><p class="stat__text info-holder">10</p></li><li class="stats-list__item stat"><p class="stat__title">Mother tongue: &nbsp;</p><p class="stat__text info-holder">Russian</p></li><li class="stats-list__item stat"><p class="stat__title">Place of birth: &nbsp;</p><p class="stat__text info-holder">Horlivka</p></li></ul><div class="hobby"><p class="hobby__title">Hobby</p><p class="hobby__text">My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness.</p></div></div><div class="profile__buttons info-buttons"><button type="button" class="info-buttons__more button">More</button><button type="button" class="info-buttons__edit button"><span class="icon-edit"></span></button></div></div></li>')
    })
})