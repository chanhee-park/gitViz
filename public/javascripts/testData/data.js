const TEST_FIELD_DATA = {
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
        'keywords': ['f4_k1', 'f4_k2', 'f4_k3'],
    },
    'f5': {
        'keywords': ['f5_k1', 'f5_k2', 'f5_k3'],
    },
};

const TEST_USER_DATA = {
    'd1': {
        'id': 'd1',
        'name': "tj",
        'star': 48057,
        'related_keyword': { 'f1_k1': 10, 'f1_k2': 15, 'f1_k3': 8, 'f2_k1': 4, 'f5_k3': 3 }
    },
    'd2': {
        'id': 'd2',
        'name': "jake",
        'star': 230393,
        'related_keyword': { 'f1_k1': 13, 'f1_k2': 25, 'f1_k3': 18, 'f2_k1': 6, 'f2_k2': 6, 'f4_k3': 3, 'f5_k3': 3 }
    },
    'd3': {
        'id': 'd3',
        'name': "tpope",
        'star': 60350,
        'related_keyword': { 'f1_k1': 8, 'f1_k2': 12, 'f1_k3': 28, 'f2_k2': 3, }
    },
    'd4': {
        'id': 'd4',
        'name': "june",
        'star': 124030,
        'related_keyword': { 'f1_k2': 6, 'f2_k1': 6, 'f2_k2': 35, 'f2_k3': 18, 'f3_k1': 6, 'f3_k2': 1 }
    },
    'd5': {
        'id': 'd5',
        'name': "flowoo",
        'star': 58035,
        'related_keyword': { 'f1_k3': 8, 'f2_k1': 13, 'f2_k2': 18, 'f2_k3': 10, 'f3_k1': 6 }
    },
    'd6': {
        'id': 'd6',
        'name': "antirez",
        'star': 72412,
        'related_keyword': { 'f2_k1': 12, 'f2_k2': 15, 'f2_k3': 21, 'f3_k3': 2 }
    },
    'd7': {
        'id': 'd7',
        'name': "jlevy",
        'star': 74805,
        'related_keyword': { 'f2_k3': 3, 'f3_k1': 19, 'f3_k2': 10, 'f3_k3': 6, 'f4_k1': 11 }
    },
    'd8': {
        'id': 'd8',
        'name': "sahat",
        'star': 62412,
        'related_keyword': { 'f2_k2': 2, 'f3_k1': 21, 'f3_k2': 7, 'f3_k3': 1, 'f4_k1': 3 }
    },
    'd9': {
        'id': 'd9',
        'name': "hukie",
        'star': 86408,
        'related_keyword': { 'f3_k1': 11, 'f3_k2': 27, 'f3_k3': 18, 'f4_k2': 2, 'f4_k3': 1 }
    },
    'd10': {
        'id': 'd10',
        'name': "chanhee",
        'star': 66094,
        'related_keyword': { 'f3_k3': 7, 'f4_k1': 13, 'f4_k2': 15, 'f4_k3': 6, 'f5_k1': 1 }
    },
    'd11': {
        'id': 'd10',
        'name': "CyCl",
        'star': 172412,
        'related_keyword': { 'f3_k2': 5, 'f4_k1': 10, 'f4_k2': 17, 'f5_k3': 10, 'f5_k2': 8 }
    },
    'd12': {
        'id': 'd12',
        'name': "ryanb",
        'star': 72412,
        'related_keyword': { 'f3_k3': 1, 'f4_k1': 23, 'f4_k2': 15, 'f4_k3': 7, 'f5_k1': 4 }
    },
    'd13': {
        'id': 'd13',
        'name': "spfe3",
        'star': 42803,
        'related_keyword': { 'f4_k3': 10, 'f5_k1': 15, 'f5_k2': 8, 'f5_k3': 4, 'f1_k2': 1 }
    },
    'd14': {
        'id': 'd14',
        'name': "erikas",
        'star': 63701,
        'related_keyword': { 'f4_k3': 4, 'f5_k1': 23, 'f5_k2': 18, 'f5_k3': 12, 'f1_k1': 2 }
    },
    'd15': {
        'id': 'd15',
        'name': "mechive",
        'star': 49329,
        'related_keyword': { 'f5_k1': 19, 'f5_k2': 6, 'f5_k3': 12, 'f1_k1': 8 }
    },
    'd16': {
        'id': 'd16',
        'name': "xyxye",
        'star': 66930,
        'related_keyword': { 'f5_k3': 4, 'f5_k1': 13, 'f5_k2': 18, 'f1_k3': 2, 'f2_k1': 2 }
    },
    'd17': {
        'id': 'd17',
        'name': "ukaia",
        'star': 42101,
        'related_keyword': { 'f5_k1': 8, 'f5_k2': 3, 'f5_k3': 7, 'f1_k2': 13 }
    },
    'd18': {
        'id': 'd18',
        'name': "tloko",
        'star': 93002,
        'related_keyword': { 'f1_k3': 18, 'f2_k1': 6, 'f2_k2': 18, 'f2_k3': 10, 'f3_k1': 6, 'f5_k1': 12, 'f5_k2': 8 }
    },
    'd19': {
        'id': 'd19',
        'name': "feili",
        'star': 70921,
        'related_keyword': { 'f2_k1': 18, 'f2_k2': 23, 'f2_k3': 27, 'f3_k2': 13, 'f4_k1': 12 }
    },
    'd20': {
        'id': 'd20',
        'name': "linlen",
        'star': 110801,
        'related_keyword': { 'f2_k3': 11, 'f3_k1': 16, 'f3_k2': 18, 'f4_k3': 30, 'f4_k2': 12, 'f5_k1': 12, 'f5_k2': 18 }
    },
};

const TEST_LINK_DATA = {
    'l1': {
        start: 'd10',
        end: 'd11'
    },
    'l2': {
        start: 'd10',
        end: 'd20'
    },
    'l3': {
        start: 'd4',
        end: 'd6'
    },
    'l4': {
        start: 'd1',
        end: 'd2'
    },
    'l5': {
        start: 'd2',
        end: 'd3'
    },
    'l6': {
        start: 'd2',
        end: 'd18'
    },
    'l7': {
        start: 'd4',
        end: 'd18'
    },
    'l8': {
        start: 'd11',
        end: 'd18'
    },
    'l9': {
        start: 'd11',
        end: 'd20'
    },
    'l10': {
        start: 'd7',
        end: 'd9'
    },
    'l11': {
        start: 'd10',
        end: 'd12'
    },
    'l12': {
        start: 'd14',
        end: 'd16'
    },
    'l13': {
        start: 'd15',
        end: 'd16'
    }
};

const TEST_PROJECT_DATA = {
    'p1': {
        name: 'project 01',
        userID: ['d1','d2'],
        star: 14993,
        field: 'f1',
        each_commit_counts_by_time: [10, 7, 8, 2, 5, 1, 0, 0, 2, 1, 1]
    },
    'p7': {
        name: 'project 07',
        userID: ['d2','d3'],
        star: 14993,
        field: 'f5',
        each_commit_counts_by_time: [3, 2, 0, 0, 0, 1, 2, 0, 0, 0, 0]
    },
    'p2': {
        name: 'project 02',
        userID: ['d2'],
        star: 14993,
        field: 'f1',
        each_commit_counts_by_time: [0, 0, 10, 8, 3, 6, 3, 6, 5, 3, 0]
    },
    'p3': {
        name: 'project 03',
        userID: ['d10', 'd20'],
        star: 14993,
        field: 'f1',
        each_commit_counts_by_time: [0, 0, 0, 3, 10, 9, 8, 8, 2, 6, 5]
    },
    'p4': {
        name: 'project 04',
        userID: ['d2'],
        star: 14993,
        field: 'f2',
        each_commit_counts_by_time: [0, 0, 0, 0, 5, 9, 8, 3, 6, 6, 5]
    },
    'p5': {
        name: 'project 05',
        userID: ['d2','d10'],
        star: 14993,
        field: 'f4',
        each_commit_counts_by_time: [0, 0, 0, 0, 1, 3, 2, 4, 5, 3, 4]
    },
    'p6': {
        name: 'project 06',
        userID: ['d10', 'd20'],
        star: 14993,
        field: 'f5',
        each_commit_counts_by_time: [0, 0, 0, 0, 0, 3, 2, 0, 3, 5, 6]
    },
    // 'p7': {
    //     name: 'project 07',
    //     field: 'f5',
    //     each_commit_counts_by_time: [3, 2, 0, 0, 0, 1, 2, 0, 0, 0, 0]
    // }
};
