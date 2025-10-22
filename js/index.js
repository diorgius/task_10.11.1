// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const minweightInput= document.querySelector('.minweight__input'); // кнопка перемешивания
const maxweightInput = document.querySelector('.maxweight__input'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = '';
  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    switch (fruits[i].color) {
      case 'фиолетовый':
        borderColorClass = 'fruit_violet';
        break;
      case 'зеленый':
        borderColorClass = 'fruit_green';
        break;
      case 'розово-красный':
        borderColorClass = 'fruit_carmazin';
        break;
      case 'желтый':
        borderColorClass = 'fruit_yellow';
        break;
      case 'светло-коричневый':
        borderColorClass = 'fruit_lightbrown';
        break;
      default:
        borderColorClass = 'fruit_default';
    }
    const itemLi = document.createElement('li');
    itemLi.className = `fruit__item  ${borderColorClass}`;
    itemLi.innerHTML = `<div class="fruit__info">  \
                          <div>index: ${i}</div> \
                          <div>kind: ${fruits[i].kind}</div> \
                          <div>color: ${fruits[i].color}</div> \
                          <div>weight (кг): ${fruits[i].weight}</div> \
                        </div>`;
    fruitsList.appendChild(itemLi);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let fruitsOriginal = JSON.stringify(fruits);
  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    result.push(...fruits.splice(getRandomInt(0, fruits.length - 1), 1));
  }
  if (fruitsOriginal === JSON.stringify(result)) {
    alert('Порядок не изменился, перемешайте еще раз');
  }
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  if (parseInt(minweightInput.value) <= 0 || parseInt(maxweightInput.value) <= 0 ||
      isNaN(parseInt(minweightInput.value)) || isNaN(parseInt(maxweightInput.value)) || 
      parseInt(minweightInput.value) > parseInt(maxweightInput.value)) {
    alert('Введены некоректные данные');
  } else {
    const fruitesFilter = fruits.filter((item) => {
      // TODO: допишите функцию
      return item.weight >= minweightInput.value && item.weight <= maxweightInput.value;
    });
    fruits = fruitesFilter;
  }
  minweightInput.value = '';
  maxweightInput.value = '';
  return fruits;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (color1, color2) => { // сортировка по алфавиту!!!
  // TODO: допишите функцию сравнения двух элементов по цвету
  console.log(color1 + ' - ' + color2);
  const priority = ['розово-красный', 'светло-коричневый', 'желтый', 'зеленый', 'фиолетовый']
  const priority1 = priority.indexOf(color1);
  const priority2 = priority.indexOf(color2);
  console.log(priority1 + ' - ' + priority2);
  return priority1 > priority2;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length - 1;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i; j++) {
        if (comparation(arr[j].color, arr[j + 1].color)) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
  },
  
  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировк
  //   const partition = (arr, start, end) => {
  //     const pivotVal = arr[end].color.length;
  //     let pivotInd = start;
  //     console.log(pivotVal);
  //     for (let j = start; j < end; j++) {
  //       if (arr[j].color.length <= pivotVal) {
  //         [arr[pivotInd], arr[j]] = [arr[j], arr[pivotInd]];
  //         pivotInd++;
  //       }
  //     }
  //     [arr[pivotInd], arr[end]] = [arr[end], arr[pivotInd]];
  //     return pivotInd;
  //   }

  //   const quickSortRecursive = (arr, start, end) => {
  //     if (start < end) {
  //       const indexElem = partition(arr, start, end);
  //       quickSortRecursive(arr, start, indexElem - 1);
  //       quickSortRecursive(arr, indexElem + 1, end);
  //     }
  //   }
  //   return quickSortRecursive(arr, 0, arr.length -1);


    const quickSortRecursive = (arr, comparation) => {
      if (arr.length < 1) {
        return arr;
      }
      console.log(arr.length);
      let pivot = arr[arr.length - 1].color;
      // console.log(pivot);
      const leftList = [];
      const rightList = [];

      for (let i = 0; i < arr.length - 1; i++) {
        if (comparation(arr[i].color, pivot)) {
          leftList.push(arr[i]);
          console.log(leftList);
        } else {
          rightList.push(arr[i])
          console.log(rightList);
        }
      }
      return [...quickSortRecursive(leftList, comparation), pivot, ...quickSortRecursive(rightList, comparation)];
    }
    console.log(arr);
    return quickSortRecursive(arr, comparation);


  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  sortKind == 'bubbleSort' ? sortKind = 'quickSort' : sortKind = 'bubbleSort';
  sortKindLabel.textContent = sortKind;
  sortTimeLabel.textContent = '-';
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortKindLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if (kindInput.value === '' || colorInput.value === '' || parseInt(weightInput.value) <= 0 || isNaN(parseInt(weightInput.value))) {
    alert ('Заполнены не все поля или введены некорректные данные');
  } else {
    fruits.push({kind: kindInput.value, color: colorInput.value, weight: weightInput.value});
    display();
  }
  kindInput.value = '';
  colorInput.value = '';
  weightInput.value ='';
});