const testUserData = {
    'd1': {
        'name': "tj",
        'star': 48057,
        'related_keyword': { 'f1_k1': 10, 'f1_k2': 15, 'f1_k3': 8, 'f2_k1': 4, 'f5_k3': 3 }
    },
    'd2': {
        'name': "jake",
        'star': 230393,
        'related_keyword': { 'f1_k1': 13, 'f1_k2': 25, 'f1_k3': 18, 'f2_k1': 6, 'f2_k2': 6, 'f4_k3': 3, 'f5_k3': 3 }
    },
    'd3': {
        'name': "tpope",
        'star': 60350,
        'related_keyword': { 'f1_k1': 8, 'f1_k2': 12, 'f1_k3': 28, 'f2_k2': 3, }
    },
    'd4': {
        'name': "june",
        'star': 124030,
        'related_keyword': { 'f1_k2': 6, 'f2_k1': 6, 'f2_k2': 35, 'f2_k3': 18, 'f3_k1': 6, 'f3_k2': 1 }
    },
    'd5': {
        'name': "flowoo",
        'star': 58035,
        'related_keyword': { 'f1_k3': 8, 'f2_k1': 13, 'f2_k2': 18, 'f2_k3': 10, 'f3_k1': 6 }
    },
    'd6': {
        'name': "antirez",
        'star': 72412,
        'related_keyword': { 'f2_k1': 12, 'f2_k2': 15, 'f2_k3': 21, 'f3_k3': 2 }
    },
    'd7': {
        'name': "jlevy",
        'star': 74805,
        'related_keyword': { 'f2_k3': 3, 'f3_k1': 19, 'f3_k2': 10, 'f3_k3': 6, 'f4_k1': 11 }
    },
    'd8': {
        'name': "sahat",
        'star': 62412,
        'related_keyword': { 'f2_k2': 2, 'f3_k1': 21, 'f3_k2': 7, 'f3_k3': 1, 'f4_k1': 3 }
    },
    'd9': {
        'name': "hukie",
        'star': 86408,
        'related_keyword': { 'f3_k1': 11, 'f3_k2': 27, 'f3_k3': 18, 'f4_k2': 2, 'f4_k3': 1 }
    },
    'd10': {
        'name': "chanhee",
        'star': 66094,
        'related_keyword': { 'f3_k3': 7, 'f4_k1': 13, 'f4_k2': 15, 'f4_k3': 6, 'f5_k1': 1 }
    },
    'd11': {
        'name': "CyCl",
        'star': 172412,
        'related_keyword': { 'f3_k2': 5, 'f4_k1': 10, 'f4_k2': 17, 'f5_k3': 10, 'f5_k2': 8 }
    },
    'd12': {
        'name': "ryanb",
        'star': 72412,
        'related_keyword': { 'f3_k3': 1, 'f4_k1': 23, 'f4_k2': 15, 'f4_k3': 7, 'f5_k1': 4 }
    },
    'd13': {
        'name': "spfe3",
        'star': 42803,
        'related_keyword': { 'f4_k3': 10, 'f5_k1': 15, 'f5_k2': 8, 'f5_k3': 4, 'f1_k2': 1 }
    },
    'd14': {
        'name': "erikas",
        'star': 63701,
        'related_keyword': { 'f4_k3': 4, 'f5_k1': 23, 'f5_k2': 18, 'f5_k3': 12, 'f1_k1': 2 }
    },
    'd15': {
        'name': "mechive",
        'star': 49329,
        'related_keyword': { 'f5_k1': 19, 'f5_k2': 6, 'f5_k3': 12, 'f1_k1': 8 }
    },
    'd16': {
        'name': "xyxye",
        'star': 66930,
        'related_keyword': { 'f5_k3': 4, 'f5_k1': 13, 'f5_k2': 18, 'f1_k3': 2, 'f2_k1': 2 }
    },
    'd17': {
        'name': "ukaia",
        'star': 42101,
        'related_keyword': { 'f5_k1': 8, 'f5_k2': 3, 'f5_k3': 7, 'f1_k2': 13 }
    },
    'd18': {
        'name': "tloko",
        'star': 93002,
        'related_keyword': { 'f1_k3': 18, 'f2_k1': 6, 'f2_k2': 18, 'f2_k3': 10, 'f3_k1': 6, 'f5_k1': 12, 'f5_k2': 8 }
    },
    'd19': {
        'name': "feili",
        'star': 70921,
        'related_keyword': { 'f2_k1': 18, 'f2_k2': 23, 'f2_k3': 27, 'f3_k2': 13, 'f4_k1':12}
    },
    'd20': {
        'name': "linlen",
        'star': 110801,
        'related_keyword': { 'f2_k3': 11, 'f3_k1': 16, 'f3_k2': 18, 'f4_k3': 30, 'f4_k2': 12, 'f5_k1': 12, 'f5_k2': 18 }
    },
};

const testFieldData = {
    'f1': {
        'keywords': ['f1_k1', 'f1_k2', 'f1_k3'],
    },
    'f2': {
        'keywords': ['f2_k1', 'f2_k2', 'f2_k3'],
    },
    'f3': {
        'keywords': ['f3_k1', 'f3_k2', 'f3_k3'],
    },
    'f4': {
        'keywords': ['f4_k1', 'f3_k2', 'f4_k3'],
    },
    'f5': {
        'keywords': ['f5_k1', 'f5_k2', 'f5_k3'],
    },
};