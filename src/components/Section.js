class Section{
    constructor({renderer}, containerSelector){
        this._renderer = renderer; // Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
        this._container = document.querySelector(containerSelector); // селектор контейнера, в который нужно добавлять созданные элементы.
    }

    renderItems(items){
     items.forEach(item => this._renderer(item)); //публичный метод, который отвечает за отрисовку всех элементов.                                                      //Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
    }

    addItem(evt){
      this._container.prepend(evt); //публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
    }
}

export{ Section };
