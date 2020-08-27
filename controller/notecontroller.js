const Note = require('../model/noteschema');

exports.create_note = async ( req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;

    const creatednote = new Note({
        title : title,
        description : description,
    })
    try{
        await creatednote.save()
        res.status(201).json({
            message : "New note created",
            createdNote : creatednote
        })
    }
    catch(err){
        res.status(500).json({
            error : err
        })
    }
}

exports.get_note = async ( req, res , next) => {
    try{
        const fetchednotes = await Note.find();
        if(fetchednotes.length == 0){
            res.status(200).json({
                message : 'No note available',
            })
        }
        res.status(200).json({
            message : 'Notes fetched successfully',
            itemscount : fetchednotes.length,
            Notes : fetchednotes
        })
    }
    catch(err){
        res.status(500).json({
            error : err
        })
    }
}

exports.update_note = async ( req, res, next) => {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    try{
        await Note.update({ _id : id}, { $set : { title : title, description: description}})
        res.status(200).json({
            message : "Note successfully updated"
        })
    }
    catch(err){
        res.status(500).json({
            error : err
        })
    }
}

exports.delete_note = async ( req, res, next) => {
    const id = req.params.id;
    try{
        await Note.remove({ _id : id})
        res.status(200).json({
            message : 'Note deleted successfully'
        })
    }
    catch(err){
        res.status(500).json({
            error : err
        })
    }
}

exports.get_singlenote = async ( req, res, next) => {
    const id = req.params.id;
    try{
        const note = await Note.findById(id);
        if(note == null){
            res.status(200).json({
                message : "Note not available",
            }) 
        }
        res.status(200).json({
            message : "Note fetched",
            fetchedNote : note
        })
    }
    catch(err){
        res.status(500).json({
            error : err
        })
    }
}