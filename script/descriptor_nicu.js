let worldDescriptor_NICU = {
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
            "postquake_corner_alcohol_wipes",
            "postquake_corner_blankets",
            "postquake_corner_chart",
            "postquake_corner_code_sheet",
            "postquake_corner_flush",
            "postquake_corner_gloves",
            "postquake_baby_self_inflating_bag",
            "postquake_baby_mask_large",
            "postquake_baby_mask_small",
            "postquake_baby_oxygen",
            "pump_antibiotic",
            "pump_d10",
            "pump_dopamine",
            "pump_heparin",
            "pump_saline",
        ],
        low: [
            "postquake_baby_cuff",
            "postquake_baby_clamp",
            "postquake_baby_hat",
            "postquake_baby_pacifier",
            "postquake_baby_stethoscope",
            "postquake_corner_baby_wipes",
            "postquake_corner_diapers",
            "postquake_corner_electrolyte",
            "postquake_corner_flashlight",
            "postquake_corner_formula",
            "postquake_corner_glucose",
            "postquake_corner_handoff_sheet",
            "postquake_corner_ivcaps",
            "postquake_corner_measuring_tape",
            "postquake_corner_scissors",
        ]
    },
    objects:          {
        prequake_baby_clamp:      {
            id:            "prequake_baby_clamp",
            filename:      "./images/panos/nicu/prequake_baby_clamp.png",
            label:         "Replogle Clamp",
            inventory_img: "./images/objects/object.png",
            yaw:           -0.386,
            pitch:         0.742,
            value:         3.23
        },
        prequake_baby_cuff:      {
            id:            "prequake_baby_cuff",
            filename:      "./images/panos/nicu/prequake_baby_cuff.png",
            label:         "BP Cuff",
            inventory_img: "./images/objects/object.png",
            yaw:           -0.949,
            pitch:         0.622,
            value:         4.0
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
        prequake_baby_mask_large:    {
            id:            "prequake_baby_mask_large",
            filename:      "./images/panos/nicu/prequake_baby_mask_large.png",
            label:         "Large mask",
            inventory_img: "./images/objects/object.png",
            yaw:           -0.3366,
            pitch:         0.3320,
            value:         6.91
        },
        prequake_baby_mask_small:    {
            id:            "prequake_baby_mask_small",
            filename:      "./images/panos/nicu/prequake_baby_mask_small.png",
            label:         "Small mask",
            inventory_img: "./images/objects/object.png",
            yaw:           -0.2639,
            pitch:         0.3418,
            value:         6.91
        },
        prequake_baby_oxygen:        {
            id:            "prequake_baby_oxygen",
            filename:      "./images/panos/nicu/prequake_baby_oxygen.png",
            label:         "Oxygen",
            inventory_img: "./images/objects/object.png",
            yaw:           1.016,
            pitch:         0.6907,
            value:         6.74
        },
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
        prequake_baby_stethoscope:   {
            id:            "prequake_baby_stethoscope",
            filename:      "./images/panos/nicu/prequake_baby_stethoscope.png",
            label:         "Stethoscope",
            inventory_img: "./images/objects/object.png",
            yaw:           .1441,
            pitch:         -0.1086,
            value:         4.27
        },
        prequake_corner_baby_wipes:     {
            id:            "prequake_corner_baby_wipes",
            filename:      "./images/panos/nicu/prequake_corner_baby_wipes.png",
            label:         "Baby wipes",
            inventory_img: "./images/objects/object.png",
            yaw:           0.5825,
            pitch:         0.3818,
            value:         2.5
        },
        prequake_corner_blankets:     {
            id:            "prequake_corner_blankets",
            filename:      "./images/panos/nicu/prequake_corner_blankets.png",
            label:         "Blankets",
            inventory_img: "./images/objects/object.png",
            yaw:           -2.16,
            pitch:         0.142,
            value:         5.95
        },
        prequake_corner_chart:      {
            id:            "prequake_corner_chart",
            filename:      "./images/panos/nicu/prequake_corner_chart.png",
            label:         "Patient Chart",
            inventory_img: "./images/objects/object.png",
            yaw:           -1.4840,
            pitch:         0.4366,
            value:         5.91
        },
        prequake_corner_code_sheet:     {
            id:            "prequake_corner_code_sheet",
            filename:      "./images/panos/nicu/prequake_corner_code_sheet.png",
            label:         "Code sheet",
            inventory_img: "./images/objects/object.png",
            yaw:           0.1551,
            pitch:         0.4305,
            value:         6.55
        },
        prequake_corner_diapers:     {
            id:            "prequake_corner_diapers",
            filename:      "./images/panos/nicu/prequake_corner_diapers.png",
            label:         "Extra Diapers",
            inventory_img: "./images/objects/object.png",
            yaw:           0.4108,
            pitch:         0.3234,
            value:         3.09
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
        prequake_corner_flashlight:  {
            id:            "prequake_corner_flashlight",
            filename:      "./images/panos/nicu/prequake_corner_flashlight.png",
            label:         "Flashlight",
            inventory_img: "./images/objects/object.png",
            yaw:           0.6924,
            pitch:         0.4973,
            value:         4.68
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
        prequake_corner_gloves:      {
            id:            "prequake_corner_gloves",
            filename:      "./images/panos/nicu/prequake_corner_gloves.png",
            label:         "Gloves",
            inventory_img: "./images/objects/object.png",
            yaw:           -0.2634,
            pitch:         -0.1222,
            value:         5.55
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
        prequake_corner_handoff_sheet:      {
            id:            "prequake_corner_handoff_sheet",
            filename:      "./images/panos/nicu/prequake_corner_handoff_sheet.png",
            label:         "Handoff sheet",
            inventory_img: "./images/objects/object.png",
            yaw:           -1.2298,
            pitch:         0.5126,
            value:         4.55
        },
        prequake_corner_ivcaps:    {
            id:            "prequake_corner_ivcaps",
            filename:      "./images/panos/nicu/prequake_corner_ivcaps.png",
            label:         "Caps for IV lines",
            inventory_img: "./images/objects/object.png",
            yaw:           0.2853,
            pitch:         0.4917,
            value:         3.64
        },
        prequake_corner_measuring_tape:       {
            id:            "prequake_corner_measuring_tape",
            filename:      "./images/panos/nicu/prequake_corner_measuring_tape.png",
            label:         "Measuring tape",
            inventory_img: "./images/objects/object.png",
            yaw:           0.5180,
            pitch:         0.5277,
            value:         2.45
        },
        prequake_corner_scissors:    {
            id:            "prequake_corner_scissors",
            filename:      "./images/panos/nicu/prequake_corner_scissors.png",
            label:         "Scissors",
            inventory_img: "./images/objects/object.png",
            yaw:           0.5992,
            pitch:         0.5185,
            value:         4.27
        },


        postquake_baby_clamp:      {
            id:            "postquake_baby_clamp",
            filename:      "./images/panos/nicu/postquake_baby_clamp.png",
            label:         "Replogle Clamp",
            inventory_img: "./images/objects/object.png",
            yaw:           -0.5455,
            pitch:         0.8731,
            value:         3.23
        },
        postquake_baby_cuff:      {
            id:            "postquake_baby_cuff",
            filename:      "./images/panos/nicu/postquake_baby_cuff.png",
            label:         "BP Cuff",
            inventory_img: "./images/objects/object.png",
            yaw:           -0.5455,
            pitch:         0.8731,
            value:         4.00
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
        postquake_baby_mask_large:    {
            id:            "postquake_baby_mask_large",
            filename:      "./images/panos/nicu/postquake_baby_mask_large.png",
            label:         "Mask - Large",
            inventory_img: "./images/objects/object.png",
            yaw:           -0.360,
            pitch:         0.312,
            value:         6.91
        },
        postquake_baby_mask_small:    {
            id:            "postquake_baby_mask_small",
            filename:      "./images/panos/nicu/postquake_baby_mask_small.png",
            label:         "Mask - Small",
            inventory_img: "./images/objects/object.png",
            yaw:           -0.285,
            pitch:         0.351,
            value:         6.91
        },
        postquake_baby_oxygen:    {
            id:            "postquake_baby_oxygen",
            filename:      "./images/panos/nicu/postquake_baby_oxygen.png",
            label:         "Oxygen",
            inventory_img: "./images/objects/object.png",
            yaw:           1.044,
            pitch:         0.818,
            value:         6.74
        },
        postquake_baby_pacifier:    {
            id:            "postquake_baby_pacifier",
            filename:      "./images/panos/nicu/postquake_baby_pacifier.png",
            label:         "Pacifier",
            inventory_img: "./images/objects/object.png",
            yaw:           -0.735,
            pitch:         0.936,
            value:         2.68
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
        postquake_baby_stethoscope:    {
            id:            "postquake_baby_stethoscope",
            filename:      "./images/panos/nicu/postquake_baby_stethoscope.png",
            label:         "Stethoscope",
            inventory_img: "./images/objects/object.png",
            yaw:           0.150,
            pitch:         -0.185,
            value:         4.27
        },


        postquake_corner_alcohol_wipes:   {
            id:            "postquake_corner_alcohol_wipes",
            filename:      "./images/panos/nicu/postquake_corner_alcohol_wipes.png",
            label:         "Alcohol wipes",
            inventory_img: "./images/objects/object.png",
            yaw:           0.809,
            pitch:         0.489,
            value:         5.09
        },
        postquake_corner_baby_wipes:    {
            id:            "postquake_corner_baby_wipes",
            filename:      "./images/panos/nicu/postquake_corner_baby_wipes.png",
            label:         "Baby wipes",
            inventory_img: "./images/objects/object.png",
            yaw:           0.906,
            pitch:         0.382,
            value:         2.5
        },
        postquake_corner_blankets:     {
            id:            "postquake_corner_blankets",
            filename:      "./images/panos/nicu/postquake_corner_blankets.png",
            label:         "Blankets",
            inventory_img: "./images/objects/object.png",
            yaw:           -1.810,
            pitch:         0.142,
            value:         5.95
        },
        postquake_corner_chart:     {
            id:            "postquake_corner_chart",
            filename:      "./images/panos/nicu/postquake_corner_chart.png",
            label:         "Patient chart",
            inventory_img: "./images/objects/object.png",
            yaw:           -1.183,
            pitch:         0.446,
            value:         5.91
        },
        postquake_corner_code_sheet:    {
            id:            "postquake_corner_code_sheet",
            filename:      "./images/panos/nicu/postquake_corner_code_sheet.png",
            label:         "Code sheet",
            inventory_img: "./images/objects/object.png",
            yaw:           0.434,
            pitch:         0.437,
            value:         6.55
        },
        postquake_corner_diapers:    {
            id:            "postquake_corner_diapers",
            filename:      "./images/panos/nicu/postquake_corner_diapers.png",
            label:         "Extra diapers",
            inventory_img: "./images/objects/object.png",
            yaw:           0.709,
            pitch:         0.307,
            value:         3.09
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
        postquake_corner_flashlight: {
            id:            "postquake_corner_flashlight",
            filename:      "./images/panos/nicu/postquake_corner_flashlight.png",
            label:         "Flashlight",
            inventory_img: "./images/objects/object.png",
            yaw:           0.966,
            pitch:         0.487,
            value:         4.68
        },
        postquake_corner_flush:    {
            id:            "postquake_corner_flush",
            filename:      "./images/panos/nicu/postquake_corner_flush.png",
            label:         "Saline flush",
            inventory_img: "./images/objects/object.png",
            yaw:           0.562,
            pitch:         0.498,
            value:         5.27
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
        postquake_corner_gloves:     {
            id:            "postquake_corner_gloves",
            filename:      "./images/panos/nicu/postquake_corner_gloves.png",
            label:         "Gloves",
            inventory_img: "./images/objects/object.png",
            yaw:           -0.010,
            pitch:         -0.127,
            value:         5.55
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
        postquake_corner_handoff_sheet:     {
            id:            "postquake_corner_handoff_sheet",
            filename:      "./images/panos/nicu/postquake_corner_handoff_sheet.png",
            label:         "Handoff sheet",
            inventory_img: "./images/objects/object.png",
            yaw:           -0.964,
            pitch:         0.540,
            value:         4.55
        },
        postquake_corner_ivcaps:   {
            id:            "postquake_corner_ivcaps",
            filename:      "./images/panos/nicu/postquake_corner_ivcaps.png",
            label:         "Caps for IV lines",
            inventory_img: "./images/objects/object.png",
            yaw:           0.652,
            pitch:         0.519,
            value:         3.64
        },
        postquake_corner_measuring_tape:      {
            id:            "postquake_corner_measuring_tape",
            filename:      "./images/panos/nicu/postquake_corner_measuring_tape.png",
            label:         "Measuring tape",
            inventory_img: "./images/objects/object.png",
            yaw:           0.773,
            pitch:         0.438,
            value:         2.45
        },
        postquake_corner_scissors:   {
            id:            "postquake_corner_scissors",
            filename:      "./images/panos/nicu/postquake_corner_scissors.png",
            label:         "Scissors",
            inventory_img: "./images/objects/object.png",
            yaw:           0.823,
            pitch:         0.586,
            value:         4.27
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
                "prequake_baby_mask_large",
                "prequake_baby_mask_small",
                "prequake_baby_oxygen",
                "prequake_baby_stethoscope",
                "prequake_baby_cuff",
                "prequake_baby_clamp"
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
                "prequake_corner_flashlight",
                "prequake_corner_chart",
                "prequake_corner_gloves",
                "prequake_corner_diapers",
                "prequake_corner_ivcaps",
                "prequake_corner_code_sheet",
                "prequake_corner_handoff_sheet",
                "prequake_corner_measuring_tape",
                "prequake_corner_scissors",
                "prequake_corner_baby_wipes",
                "prequake_corner_blankets"
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
                "postquake_baby_mask_large",
                "postquake_baby_mask_small",
                "postquake_baby_oxygen",
                "postquake_baby_pacifier",
                "postquake_baby_stethoscope",
                "postquake_baby_cuff",
                "postquake_baby_clamp"
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
                "postquake_corner_flashlight",
                "postquake_corner_chart",
                "postquake_corner_gloves",
                "postquake_corner_diapers",
                "postquake_corner_ivcaps",
                "postquake_corner_alcohol_wipes",
                "postquake_corner_code_sheet",
                "postquake_corner_handoff_sheet",
                "postquake_corner_measuring_tape",
                "postquake_corner_scissors",
                "postquake_corner_flush",
                "postquake_corner_baby_wipes",
                "postquake_corner_blankets",
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
            id:        "pump_antibiotic",
            imageFile: "./images/pump/pump_antibiotic.png",
            label:     "Antibiotic Syringe",
            value:     6.32
        },
        "pump_d10":        {
            id:        "pump_d10",
            imageFile: "./images/pump/pump_d10.png",
            label:     "D10W Infusion",
            value:     6.32
        },
        "pump_dopamine":   {
            id:        "pump_dopamine",
            imageFile: "./images/pump/pump_dopamine.png",
            label:     "Dopamine Syringe",
            value:     6.32
        },
        "pump_heparin":    {
            id:        "pump_heparin",
            imageFile: "./images/pump/pump_heparin.png",
            label:     "Heparin Syringe",
            value:     6.32
        },
        "pump_saline":     {
            id:        "pump_saline",
            imageFile: "./images/pump/pump_saline.png",
            label:     "NS Infusion",
            value:     6.32
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
        testMode: false,
    }
};