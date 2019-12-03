'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Taxrates = mongoose.model('Taxrates');

var credentials,
    token,
    mockup;

describe('Taxrates CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            country: "US",
            state: "AL",
            postcode: "12530",
            city: "bkk",
            rate: "4",
            name: "State Tax",
            priority: 1,
            compound: false,
            shipping: false,
            order: 1,
            class: "standard",
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Taxrates get use token', (done)=>{
        request(app)
        .get('/api/taxratess')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .end((err, res)=>{
            if (err) {
                return done(err);
            }
            var resp = res.body;
            done();
        });
    });

    it('should be Taxrates get by id', function (done) {

        request(app)
            .post('/api/taxratess')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/taxratess/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.country, mockup.country);
                        assert.equal(resp.data.state, mockup.state);
                        assert.equal(resp.data.postcode, mockup.postcode);
                        assert.equal(resp.data.city, mockup.city);
                        assert.equal(resp.data.rate, mockup.rate);
                        assert.equal(resp.data.name, mockup.name);
                        assert.equal(resp.data.priority, mockup.priority);
                        assert.equal(resp.data.compound, mockup.compound);
                        assert.equal(resp.data.shipping, mockup.shipping);
                        assert.equal(resp.data.order, mockup.order);
                        assert.equal(resp.data.class, mockup.class);
                        done();
                    });
            });

    });

    it('should be Taxrates post use token', (done)=>{
        request(app)
            .post('/api/taxratess')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.country, mockup.country);
                assert.equal(resp.data.state, mockup.state);
                assert.equal(resp.data.postcode, mockup.postcode);
                assert.equal(resp.data.city, mockup.city);
                assert.equal(resp.data.rate, mockup.rate);
                assert.equal(resp.data.name, mockup.name);
                assert.equal(resp.data.priority, mockup.priority);
                assert.equal(resp.data.compound, mockup.compound);
                assert.equal(resp.data.shipping, mockup.shipping);
                assert.equal(resp.data.order, mockup.order);
                assert.equal(resp.data.class, mockup.class);
                done();
            });
    });

    it('should be taxrates put use token', function (done) {

        request(app)
            .post('/api/taxratess')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    country: "USs",
                    state: "AsL",
                    postcode: "99999",
                    city: "bkks",
                    rate: "5",
                    name: "State Taxx",
                    priority: 2,
                    compound: true,
                    shipping: true,
                    order: 2,
                    class: "power",
                }
                request(app)
                    .put('/api/taxratess/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.country, update.country);
                        assert.equal(resp.data.state, update.state);
                        assert.equal(resp.data.postcode, update.postcode);
                        assert.equal(resp.data.city, update.city);
                        assert.equal(resp.data.rate, update.rate);
                        assert.equal(resp.data.name, update.name);
                        assert.equal(resp.data.priority, update.priority);
                        assert.equal(resp.data.compound, update.compound);
                        assert.equal(resp.data.shipping, update.shipping);
                        assert.equal(resp.data.order, update.order);
                        assert.equal(resp.data.class, update.class);
                        done();
                    });
            });

    });

    it('should be taxrates delete use token', function (done) {

        request(app)
            .post('/api/taxratess')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/taxratess/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be taxrates get not use token', (done)=>{
        request(app)
        .get('/api/taxratess')
        .expect(403)
        .expect({
            status: 403,
            message: 'User is not authorized'
        })
        .end(done);
    });

    it('should be taxrates post not use token', function (done) {

        request(app)
            .post('/api/taxratess')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be taxrates put not use token', function (done) {

        request(app)
            .post('/api/taxratess')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/taxratess/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be taxrates delete not use token', function (done) {

        request(app)
            .post('/api/taxratess')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/taxratess/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Taxrates.remove().exec(done);
    });

});