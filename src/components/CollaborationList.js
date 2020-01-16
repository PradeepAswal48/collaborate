import React from 'react';
import { getCollaborations } from '../utils/database.js';
class CollaborationList extends React.Component {
    constructor() {
        super();
        this.state = {
            Collaborations : getCollaborations()
        }
    }

    render() {
        return (
            <div>
                i am the list
            </div>
        );
    }
}

export default CollaborationList;