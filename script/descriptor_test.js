let worldDescriptor_TEST = {
    ajaxEndpoint: "save_report.php",
    sceneTags:        {
        initialSceneId: "prequake_baby_blank",
        secondSceneId:  "postquake_baby_blank",
        black:          "black"
    },
    audioFiles: {
        patient_signout: "./audio/03-active/signout_nicu.mp3",
    },
    textBlocks: {
        patient_signout: "<p>I’m going to give you some signout on Jayden.</p><p>He is a 2.5kg, 2 week old ex 38 weeker. He is a male and he presented to the hospital with fever, sepsis and shock. He became apneic during his initial evaluation in the ED and was intubated and placed on a conventional ventilator.  He is hemodynamically unstable and has received 40mL/kg of saline boluses and has an arterial line for blood pressure monitoring. He was started on a dopamine infusion for continued signs of shock and now has a stable blood pressure. He is receiving antibiotics via his IV as we speak.  He is currently on a dextrose containing maintenance IV fluids for some initial hypoglycemia and is now stable. He has received sedation and is minimally responsive.</p><p>Jayden is just getting settled into the neonatal intensive care unit after admission from the ED. His mother has just stepped out of the unit to make a phone call.</p>",
    },
    requiredObjects:  {
        high:   [
            "postquake_baby_label",
            "postquake_baby_self_inflating_bag",
        ],
        low: [
            "postquake_baby_hat",
            "postquake_corner_electrolyte",
            "postquake_corner_formula",
            "postquake_corner_glucose",
        ]
    },
    objects:          {
        prequake_baby_pacifier:      {
            id:            "prequake_baby_pacifier",
            filename:      "./images/panos/nicu/prequake_baby_pacifier.png",
            label:         "Pacifier",
            inventory_img: "./images/objects/object.png",
            yaw:           -0.5455,
            pitch:         0.8731,
            value:         2.68
        },
        prequake_baby_self_inflating_bag:   {
            id:            "prequake_baby_self_inflating_bag",
            filename:      "./images/panos/nicu/prequake_baby_self_inflating_bag.png",
            label:         "Self-inflating bag",
            inventory_img: "./images/objects/object.png",
            yaw:           0.2840,
            pitch:         -0.1074,
            value:         6.87
        },
        prequake_baby_hat:           {
            id:            "prequake_baby_hat",
            filename:      "./images/panos/nicu/prequake_baby_hat.png",
            label:         "Hat",
            inventory_img: "./images/objects/object.png",
            yaw:           -0.8681,
            pitch:         0.9518,
            value:         4.77
        },
        prequake_corner_electrolyte:     {
            id:            "prequake_corner_electrolyte",
            filename:      "./images/panos/nicu/prequake_corner_electrolyte.png",
            label:         "Oral Electrolyte Solution",
            inventory_img: "./images/objects/object.png",
            yaw:           0.2847,
            pitch:         0.3212,
            value:         2.09
        },
        prequake_corner_glucose:     {
            id:            "prequake_corner_glucose",
            filename:      "./images/panos/nicu/prequake_corner_glucose.png",
            label:         "Glucose Water",
            inventory_img: "./images/objects/object.png",
            yaw:           0.2300,
            pitch:         0.3160,
            value:         2.41
        },
        prequake_corner_formula:     {
            id:            "prequake_corner_formula",
            filename:      "./images/panos/nicu/prequake_corner_formula.png",
            label:         "Infant Formula",
            inventory_img: "./images/objects/object.png",
            yaw:           0.1792,
            pitch:         0.3148,
            value:         2.09
        },
        postquake_baby_self_inflating_bag:    {
            id:            "postquake_baby_self_inflating_bag",
            filename:      "./images/panos/nicu/postquake_baby_self_inflating_bag.png",
            label:         "Self-inflating bag",
            inventory_img: "./images/objects/object.png",
            yaw:           0.284,
            pitch:         -0.125,
            value:         6.87
        },
        postquake_baby_hat:    {
            id:            "postquake_baby_hat",
            filename:      "./images/panos/nicu/postquake_baby_hat.png",
            label:         "Hat",
            inventory_img: "./images/objects/object.png",
            yaw:           -0.943,
            pitch:         0.949,
            value:         4.77
        },
        postquake_baby_label:    {
            id:            "postquake_baby_label",
            filename:      "./images/panos/nicu/postquake_baby_label.png",
            label:         "Label",
            inventory_img: "./images/objects/object.png",
            yaw:           -0.538,
            pitch:         0.868,
            value:         6.18
        },

        postquake_corner_formula:    {
            id:            "postquake_corner_formula",
            filename:      "./images/panos/nicu/postquake_corner_formula.png",
            label:         "Infant formula",
            inventory_img: "./images/objects/object.png",
            yaw:           0.480,
            pitch:         0.316,
            value:         2.09
        },
        postquake_corner_glucose:    {
            id:            "postquake_corner_glucose",
            filename:      "./images/panos/nicu/postquake_corner_glucose.png",
            label:         "Glucose water",
            inventory_img: "./images/objects/object.png",
            yaw:           0.528,
            pitch:         0.303,
            value:         2.41
        },
        postquake_corner_electrolyte:    {
            id:            "postquake_corner_electrolyte",
            filename:      "./images/panos/nicu/postquake_corner_electrolyte.png",
            label:         "Oral electrolyte solution",
            inventory_img: "./images/objects/object.png",
            yaw:           0.548,
            pitch:         0.327,
            value:         2.09
        },
    },
    sceneDescriptors: {
        "prequake_baby_blank":    {
            name:                  "By the baby",
            filename:              "./images/panos/nicu/prequake_baby_blank.jpg",
            initialViewParameters: {
                pitch: 0.2,
                yaw:   -0.3,
                fov:   Math.PI / 2
            },
            linkHotspots:          [{
                yaw:        0.49,
                pitch:      0.3,
                rotation:   0,
                javascript: "app.stateMachine.enterState(STATE_TRAINING_MODE_END)",
                label:      "End training",
            }, {
                yaw:        -1.05,
                pitch:      0.27,
                rotation:   0,
                javascript: "app.stateMachine.enterState(STATE_TRAINING_MODE_PUMP)",
                label:      "IV pole with pumps",
            }],
            teleportHotspots:      [{
                yaw:      -1.86,
                pitch:    0.24,
                rotation: 0,
                target:   "prequake_corner_blank",
            }],
            infoHotspots:          [],
            objects:               [
                "prequake_baby_pacifier",
                "prequake_baby_self_inflating_bag",
                "prequake_baby_hat",
            ]
        },
        "prequake_corner_blank":  {
            name:                  "Corner station",
            filename:              "./images/panos/nicu/prequake_corner_blank.jpg",
            initialViewParameters: {
                "pitch": 0.3,
                "yaw":   -0.2,
                "fov":   1.5707963267948966
            },
            teleportHotspots:      [{
                yaw:      2.95,
                pitch:    0.24,
                rotation: 0,
                target:   "prequake_baby_blank",
            }],
            infoHotspots:          [],
            objects:               [
                "prequake_corner_electrolyte",
                "prequake_corner_glucose",
                "prequake_corner_formula",
            ]
        },
        "postquake_baby_blank":   {
            name:           "By the baby",
            filename:       "./images/panos/nicu/postquake_baby_blank.jpg",
            initialViewParameters: {
                pitch:      0.2,
                yaw:        -0.3,
                fov:        1.5707963267948966
            },
            linkHotspots:          [{
                yaw:        0.48,
                pitch:      0.3,
                rotation:   0,
                javascript: "app.stateMachine.enterState(STATE_ACTIVE_MODE_END_CHALLENGE)",
                label:      "Assess",
            }, {
                yaw:        -1.05,
                pitch:      0.27,
                rotation:   0,
                javascript: "app.stateMachine.enterState(STATE_ACTIVE_MODE_PUMP)",
                label:      "IV pole with pumps",
            }],
            teleportHotspots:      [{
                yaw:        -1.86,
                pitch:      0.18,
                rotation:   0,
                target:     "postquake_corner_blank",
            }],
            infoHotspots:          [],
            objects:               [
                "postquake_baby_self_inflating_bag",
                "postquake_baby_hat",
                "postquake_baby_label",
            ]
        },
        "postquake_corner_blank": {
            name:                  "In the corner",
            filename:              "./images/panos/nicu/postquake_corner_blank.jpg",
            initialViewParameters: {
                pitch: 0.2,
                yaw:   -0.3,
                fov:   1.5707963267948966
            },
            teleportHotspots:      [{
                yaw:      3.3,
                pitch:    0.18,
                rotation: 0,
                target:   "postquake_baby_blank",
            }],
            infoHotspots:          [],
            objects:               [
                "postquake_corner_formula",
                "postquake_corner_glucose",
                "postquake_corner_electrolyte",
            ]
        },
        "black": {
            name:           "Black out",
            filename:       "./images/panos/black.png",
            initialViewParameters: {
                pitch:      0,
                yaw:        0,
                fov:        1.5707963267948966
            },
            linkHotspots: [],
            teleportHotspons: [],
            infoHotspots: [],
            objects: []
        }
    },
    objects2D: {
        "pump_antibiotic": {
            id: "pump_antibiotic",
            imageFile: "./images/pump/pump_antibiotic.png",
            label:  "Antibiotic Syringe",
            value:         6.32
        },
        "pump_d10": {
            id: "pump_d10",
            imageFile: "./images/pump/pump_d10.png",
            label:  "D10W Infusion",
            value:         6.32
        },
        "pump_dopamine": {
            id: "pump_dopamine",
            imageFile: "./images/pump/pump_dopamine.png",
            label:  "Dopamine Syringe",
            value:         6.32
        },
        "pump_heparin": {
            id: "pump_heparin",
            imageFile: "./images/pump/pump_heparin.png",
            label:  "Heparin Syringe",
            value:         6.32
        },
        "pump_saline": {
            id: "pump_saline",
            imageFile: "./images/pump/pump_saline.png",
            label:  "NS Infusion",
            value:         6.32
        },
    },
    scenes2D: {
        pump: {
            baseImage: "./images/pump/static.png",
            width: 726,
            height: 486,
            objects: [
                "pump_antibiotic",
                "pump_dopamine",
                "pump_d10",
                "pump_heparin",
                "pump_saline",
            ]
        }
    },
    settings:         {},
    viewerOptions:    {
        controls: {
            mouseViewMode: "drag",
            stageType:     'webgl'
        }
    },
    debug: {
        testMode: true,
    }
};