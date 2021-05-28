class ComponentContainer {

    constructor() {
        this.type = 1;
        this.components = [];
    }

    addComponent(comp){
        this.components = [...this.components,comp];
    }



}

module.exports = ComponentContainer;
