'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaxratesSchema = new Schema({
   // name: {
    //     type: String,
    //     required: 'Please fill a Taxrates name',
    // },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    postcode: {
        type: String,
    },
    city: {
        type: String,
    },
    rate: {
        type: String,
    },
    name: {
        type: String,
    },
    priority: {
        type: Number,
        Default: "1"
    },
    compound: {
        type: Boolean,
        Default: "false"
    },
    shipping: {
        type: Boolean,
        Default: "false"
    },
    order: {
        type: Number,
    },
    class: {
        type: String,
        Default: "standard"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Taxrates", TaxratesSchema);