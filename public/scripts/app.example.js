class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.filterByDriver = document.getElementById("driver");
    this.filterByDate = document.getElementById("filterDate");
    this.filterByTime = document.getElementById("filterTime");
    this.filterByCapacity = document.getElementById("filterCapacity");
  }

  async init() {
    //await this.load();

    // Register click listener
    //this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run;
  }

  run = () => {
    const dateValue = this.filterByDate.value;
    const timeValue = this.filterByTime.value;
    const capacityValue = this.filterByCapacity.value;

    const newDateTime = new Date('${dateValue} ${timeValue}');
    const epochTime = newDateTime.getTime();

    console.log(dateValue, timeValue, capacityValue, newDateTime, epochTime);

    this.load(epochTime, capacityValue);
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async load(dateFilter, capacityFilter) {
    const cars = await Binar.listCars(item => item.capacity >= capacityFilter && item.availableAt >= dateFilter); //recording rabu kemarin
    console.log('cars', cars);
    Car.init(cars);
    car.list.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }

    this.filterByCapacity.value = "";
    this.filterByDate.value = "";
    this.filterByDriver.value = "";
    this.filterByTime.value = "";
  };
}
