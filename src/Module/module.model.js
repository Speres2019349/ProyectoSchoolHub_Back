const moduleSchema = new mongoose.Schema({
    nameModule: {
        type: String,
    },
    videos: [{
        type: String,
        validate: function (val) {
            const regex = /^(ftp|http|https):\/\/[^ "]+$/
            return regex.test(val) || val.startsWith('/uploads/')
        },
        message: 'Url invalida o ruta de archivo invalida'
    }],
    descriptionModule: {
        type: String,
    },
    exams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    }],
    state: {
        type: String,
        enum: ["habilitado", "deshabilitado", "enActivacion"],
        default: "habilitado"
    },
    img: {
        type: String
    },
    files: [{
        type: String,
        validate: {
            validator: function (val) {
                const allowedExtensions = /\.(txt|pdf|doc|docx|xls|xlsx)$/i;
                return allowedExtensions.test(val);
            },
            message: 'Tipo de archivo no permitido. Solo se permiten archivos txt, pdf, doc, docx, xls, xlsx.'
        }
    }]

});