async function getRecordsByField(object, field, context) {
    const fields = {};
    fields[object + '_ID'] = field;

    let records = [];
    if (field) {
        records = await context.getOne(object, fields);
    } else {
        records = await context.getAll(object);
    }
    return records;
}
async function mutateRecord(object, idField, fields, context) {
    return await context.getOne(object, idField ? idField : fields)
        .then(async records => {
            let targetRecord = {};
            if (records.length > 0) {
                targetRecord = await context.updateOne(object, fields)
                    .then(() => context.getOne(object, fields));
            } else {
                delete fields[Object.keys(fields).find(field => fields[field] === idField)];
                targetRecord = await context.insertOne(object, fields)
                    .then(() => context.getOne(object, fields));
            }
            return targetRecord[0];
        });
}
async function deleteRecord(object, id, context) {
    let recordIdObject = {};
    recordIdObject[object + '_ID'] = id;
    let targetFaculty = await context.getOne(object, recordIdObject);
    context.deleteOne(object, id);
    return targetFaculty[0];
}


module.exports = {
    getFaculties: (args, context) => getRecordsByField('FACULTY', args.faculty, context),
    getPulpits: (args, context) => getRecordsByField('PULPIT', args.pulpit, context),
    getSubjects: async (args, context) => {
        const {subject, faculty} = args;
        return faculty ?
            await context.query(
                `SELECT * FROM SUBJECT s
                    JOIN PULPIT p ON s.PULPIT_ID = p.PULPIT_ID 
                    JOIN FACULTY f ON p.FACULTY_ID = f.FACULTY_ID
                    WHERE p.FACULTY_ID = ${faculty};`
            ) : await getRecordsByField('SUBJECT', subject, context);
    },
    getTeachers: async (args, context) => {
        const {teacher, faculty} = args;
        return faculty ?
            await context.query(
                `SELECT * FROM TEACHER t 
                    JOIN PULPIT p ON t.PULPIT_ID = p.PULPIT_ID 
                    JOIN FACULTY f ON p.FACULTY_ID = f.FACULTY_ID
                    WHERE p.FACULTY_ID = ${faculty};`
            ) : await getRecordsByField('TEACHER', teacher, context);
    },
    setFaculty: (args, context) => {
        let fields = {FACULTY_ID: args.faculty.facultyId, FACULTY_NAME: args.faculty.facultyName};
        return mutateRecord('FACULTY', fields.FACULTY_ID, fields, context);
    },
    setPulpit: async (args, context) => {
        let fields = {PULPIT_ID: args.pulpit.pulpitId, PULPIT_NAME: args.pulpit.pulpitName, FACULTY_ID: args.pulpit.facultyId};
        return mutateRecord('PULPIT', fields.PULPIT_ID, fields, context);
    },
    setSubject: async (args, context) => {
        let fields = {SUBJECT_ID: args.subject.subjectId, SUBJECT_NAME: args.subject.subjectName, PULPIT_ID: args.subject.pulpitId};
        return mutateRecord('SUBJECT', fields.SUBJECT_ID, fields, context);
    },
    setTeacher: async (args, context) => {
        let fields = {TEACHER_ID: args.teacher.teacherId, TEACHER_NAME: args.teacher.teacherName, PULPIT_ID: args.teacher.pulpitId};
        return mutateRecord('TEACHER', fields.TEACHER_ID, fields, context);
    },

    delFaculty: (args, context) => deleteRecord('FACULTY', args.id, context),
    delPulpit: (args, context) => deleteRecord('PULPIT', args.id, context),
    delSubject: (args, context) => deleteRecord('SUBJECT', args.id, context),
    delTeacher: (args, context) => deleteRecord('TEACHER', args.id, context)
};