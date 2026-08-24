/// <reference types="cypress" />

// GET /api/cars/brands — проверить статус и список брендов
// GET /api/cars/models — проверить статус и список моделей
// POST /api/cars — создать машину и проверить response
// PUT /api/cars/{id} — изменить созданную машину и проверить новые данные
// DELETE /api/cars/{id} — удалить её и проверить carId

describe('Garage tests', () => {
    let sid;
    let addedCars = [];
    before(() => {
        cy.request('POST', '/api/auth/signin', {
            'email': Cypress.env('userEmail'),
            'password': Cypress.env('userPassword'),
        }).then((res) => {
            expect(res.status).to.equal(200);
            sid = JSON.stringify(res.headers['set-cookie']).split(';')[0].split('=')[1];
        });
    });

    after(() => {
        cy.log(addedCars);
        addedCars.forEach((id) => {
            cy.request({
                method: 'DELETE',
                url: `/api/cars/${id}`,
                headers: {
                    'Cookie': `sid=${sid}`
                }
            }).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body.data.carId).to.eq(id);
            });
        });
    });
    context('Get brands and models', () => {
        it('Get all brands', () => {
            cy.request('GET', '/api/cars/brands').then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data).to.have.length(5);
            });
        });
        it('Get all models', () => {
            cy.request('GET', '/api/cars/models').then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data).to.have.length(23);
            });
        });
    });
    context('Add cars', () => {
        it('Add Audi R8 to Garage', () => {
            cy.request({
                method: 'POST',
                url: '/api/cars',
                body: {
                    'carBrandId': 1,
                    'carModelId': 2,
                    'mileage': 777
                },
                headers: {
                    'Cookie': `sid=${sid}`
                }
            }).then((res) => {
                expect(res.status).to.equal(201);
                expect(res.body.status).to.equal('ok');
                expect(res.body.data.brand).to.eq('Audi');
                expect(res.body.data.model).to.eq('R8');
                addedCars.push(res.body.data.id);
            });
        });
        it('Add BMW 3 to Garage', () => {
            cy.request({
                method: 'POST',
                url: '/api/cars',
                body: {
                    'carBrandId': 2,
                    'carModelId': 6,
                    'mileage': 777
                },
                headers: {
                    'Cookie': `sid=${sid}`
                }
            }).then((res) => {
                expect(res.status).to.equal(201);
                expect(res.body.status).to.equal('ok');
                expect(res.body.data.brand).to.eq('BMW');
                expect(res.body.data.model).to.eq('3');
                addedCars.push(res.body.data.id);
            });
        });
    });
    context('Edit car', () => {
        it('Edit Audi R8 to Porsche Panamera', () => {
            cy.request({
                method: 'POST',
                url: '/api/cars',
                body: {
                    'carBrandId': 1,
                    'carModelId': 2,
                    'mileage': 777
                },
                headers: {
                    'Cookie': `sid=${sid}`
                }
            }).then((res) => {
                expect(res.status).to.equal(201);
                const carId = res.body.data.id;
                addedCars.push(carId);
                cy.request({
                    method: 'PUT',
                    url: `/api/cars/${carId}`,
                    body: {
                        "carBrandId": 4,
                        "carModelId": 18,
                        'mileage': 888,
                        "carCreatedAt": "2026-08-04T00:00:00.000Z"
                    },
                    headers: {
                        'Cookie': `sid=${sid}`
                    }
                }).then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.status).to.equal('ok');
                    expect(res.body.data.brand).to.eq('Porsche');
                    expect(res.body.data.model).to.eq('Panamera');
                    expect(res.body.data.mileage).to.eq(888);
                    expect(res.body.data.carCreatedAt).to.eq("2026-08-04T00:00:00.000Z");
                });
            });
        });
        it('Error for edit car with invalid model', () => {
            cy.request({
                method: 'POST',
                url: '/api/cars',
                body: {
                    'carBrandId': 1,
                    'carModelId': 2,
                    'mileage': 777
                },
                headers: {
                    'Cookie': `sid=${sid}`
                }
            }).then((res) => {
                expect(res.status).to.equal(201);
                const carId = res.body.data.id;
                addedCars.push(carId);
                cy.request({
                    method: 'PUT',
                    failOnStatusCode: false,
                    url: `/api/cars/${carId}`,
                    body: {
                        'carModelId': 7,
                    },
                    headers: {
                        'Cookie': `sid=${sid}`
                    }
                }).then((res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body.status).to.equal('error');

                });
            });
        });
    });
    context('Delete car', () => {
        it('Delete existing car', () => {
            cy.request({
                method: 'POST',
                url: '/api/cars',
                body: {
                    'carBrandId': 1,
                    'carModelId': 2,
                    'mileage': 777
                },
                headers: {
                    'Cookie': `sid=${sid}`
                }
            }).then((res) => {
                expect(res.status).to.equal(201);
                const carId = res.body.data.id;
                cy.request({
                    method: 'DELETE',
                    url: `/api/cars/${carId}`,
                    headers: {
                        'Cookie': `sid=${sid}`
                    }
                }).then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.status).to.equal('ok');
                    expect(res.body.data.carId).to.equal(carId);
                });
            });
        });
        it('Error when delete non-existing record', () => {
            cy.request({
                method: 'DELETE',
                failOnStatusCode: false,
                url: `/api/cars/5555125212551125151251525`,
                headers: {
                    'Cookie': `sid=${sid}`
                }
            }).then((res) => {
                expect(res.status).to.equal(404);
                expect(res.body.status).to.equal('error');
                expect(res.body.message).to.equal('Car not found');
            });
        });
    });
});
