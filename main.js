window.addEventListener('DOMContentLoaded', () => {
    createRegionLabels();
})


// start-screen selectors
const startContainer = document.querySelector('.start-container');
const startScreenBtn = document.querySelector('.start-screen__btn');

// start screen events
startScreenBtn.addEventListener('click', () => {
    
    startContainer.classList.add('hidden');
    setTimeout(() => {
        form.classList.add('form-visible');
    }, 2500);
})


//form selectors
const form = document.querySelector('.form');

const nameStepContainer = document.querySelector('.form__name-step')
const nameInput = document.querySelector('#name-input');
const nameStepForwardBtn = document.querySelector('.form__name-step-forward-btn')
const nameStepSkipBtn = document.querySelector('.form__name-step-skip-btn');

const budgetStepContainer = document.querySelector('.form__budget-step');
const budgetInputs = document.querySelectorAll('.budget-input');
const budgetStepSkipBtn = document.querySelector('.form__budget-step__skip-btn');

const purposeStepContainer = document.querySelector('.form__purpose-step');
const purposeInputs = document.querySelectorAll('.purpose-input');

const regionStepContainer = document.querySelector('.form__region-step');
const regionStepInfo = document.querySelector('.form__region-step__info')
const regionStepForwardBtn = document.querySelector('.form__region-step-forward-btn');

const formResultStep = document.querySelector('.form__result-step');


// form events
let formObj = {
    name: '',
    budget: '',
    purpose: '',
    region: []
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
})



nameInput.addEventListener('input', (e) => {
    formObj.name = e.target.value;

    if (formObj.name.length > 0) {
        nameStepForwardBtn.disabled = false;
    } else {
        nameStepForwardBtn.disabled = true;
    }
});

//greeting div
nameStepForwardBtn.addEventListener('click', () => {

    const helloMessageDiv = document.createElement('div');
    helloMessageDiv.className = 'hello-message step-hidden';

    const helloMessageTitle = document.createElement('h3')
    helloMessageTitle.className = 'hello-message__title'
    helloMessageTitle.textContent = `Очень приятно, ${formObj.name}!`
    ;
    
    const helloMessagedesc = document.createElement('p')
    helloMessagedesc.className = 'hello-message__desc'
    helloMessagedesc.textContent = 'Через мгновение начнётся магия'
    ;

    nameStepContainer.classList.add('step-hidden');

    setTimeout(() => {
        helloMessageDiv.classList.remove('step-hidden');
        helloMessageDiv.classList.add('step-visible');

        helloMessageDiv.appendChild(helloMessageTitle);
        helloMessageDiv.appendChild(helloMessagedesc);
        form.appendChild(helloMessageDiv);
    }, 2500);

    setTimeout(() => {
        helloMessageDiv.classList.add('step-hidden')
        helloMessageDiv.classList.remove('step-visible')
    }, 6500);


    setTimeout(() => {
        budgetStepContainer.classList.add('step-visible');
        budgetStepContainer.classList.remove('step-hidden');

    }, 9000);

})

nameStepSkipBtn.addEventListener('click', () => {
    nameStepContainer.classList.add('step-hidden');
    setTimeout(() => {
        budgetStepContainer.classList.add('step-visible');
        budgetStepContainer.classList.remove('step-hidden');
    }, 2500);
})



// budget

budgetInputs.forEach(input => {
    input.addEventListener('change', (e) => {
        formObj.budget = e.target.value;
        
        budgetStepContainer.classList.remove('step-visible');
        budgetStepContainer.classList.add('step-hidden');

        setTimeout(() => {
            purposeStepContainer.classList.add('step-visible');
            purposeStepContainer.classList.remove('step-hidden');
        }, 2500);
    })
});

budgetStepSkipBtn.addEventListener('click', () => {
    budgetStepContainer.classList.remove('step-visible');
    budgetStepContainer.classList.add('step-hidden');

    setTimeout(() => {
        purposeStepContainer.classList.add('step-visible');
        purposeStepContainer.classList.remove('step-hidden');
    }, 2500);
});


// purpose

purposeInputs.forEach(input => {
    input.addEventListener('change', (e) => {
        formObj.purpose = e.target.value
        
        purposeStepContainer.classList.add('step-hidden');
        purposeStepContainer.classList.remove('step-visible');

        setTimeout(() => {
            regionStepContainer.classList.add('step-visible');
            regionStepContainer.classList.remove('step-hidden');
        }, 2500);
    })
})


//region step

async function createRegionLabels () {
    const allRegions = [
    {
        value: 'Хамовники',
        id: 'khamovniki',
        name: 'region',
        color: 'green'
    },
    {
        value: 'Тверской',
        id: 'tverskoi',
        name: 'region',
        color: 'brown'
    },
    {
        value: 'Якиманка',
        id: 'yakimanka',
        name: 'region',
        color: 'brown'
    },
    {
        value: 'Раменки',
        id: 'ramenki',
        name: 'region',
        color: 'green'
    },
    {
        value: 'Москва-Сити',
        id: 'moskva-city',
        name: 'region',
        color: 'blue'
    },
    {
        value: 'Замоскворечье',
        id: 'zamoskvoreche',
        name: 'region',
        color: 'brown'
    },
    {
        value: 'ВДНХ',
        id: 'vdnh',
        name: 'region',
        color: 'green'
    }
    ];

 allRegions.forEach(region => {
    const regionLabel = document.createElement('label');
     const regionInput = document.createElement('input');
     const checkIcon = document.createElement('span');
     checkIcon.innerHTML = '&#10003;'

    regionInput.className = 'region-input';
    regionInput.hidden = true;
    regionInput.value = region.value;
    regionInput.id = region.id;
    regionInput.name = 'region';
    regionInput.type = 'radio';

    regionLabel.htmlFor = region.id;
     regionLabel.className = 'region-label';
     regionLabel.id = `region-${region.id}`;
     regionLabel.textContent = region.value;

     regionLabel.appendChild(checkIcon)
    regionStepInfo.appendChild(regionInput);
    regionStepInfo.appendChild(regionLabel);
 })
    
    const regionInputs = document.querySelectorAll('.region-input');
    regionInputs.forEach(input => {
        input.addEventListener('change', e => {
            const inputValue = e.target.value;
            const lab = document.querySelector(`#region-${e.target.id}`)

            if (formObj.region.includes(inputValue)) {
                const index = formObj.region.indexOf(inputValue);
                formObj.region.splice(index, 1);
                lab.classList.remove('region-label_selected');

            } else {
                formObj.region.push(inputValue);
                lab.classList.add('region-label_selected');
            };

            if (formObj.region.length == 0) {
            regionStepForwardBtn.disabled = true
        } else {
            regionStepForwardBtn.disabled = false;
        }

            console.log(formObj)
        })
    })
};


regionStepForwardBtn.addEventListener('click', () => {
    regionStepContainer.classList.remove('step-visible');
    regionStepContainer.classList.add('step-hidden');

    setTimeout(() => {
        formResultStep.classList.remove('step-hidden');
        formResultStep.classList.add('step-visible');
        displayResult()
    }, 2500);
})

async function displayResult() {
    const userName = document.createElement('p');
    userName.textContent = `посетитель: ${formObj.name}`;
    const userBudget = document.createElement('p');
    userBudget.textContent = `бюджет: ${formObj.budget} млн руб.`
    const userPurpose = document.createElement('p');
    userPurpose.textContent = `цель покупки: ${formObj.purpose}`;

    formResultStep.appendChild(userName)
    formResultStep.appendChild(userBudget)
    formResultStep.appendChild(userPurpose)

    const regionTitle = document.createElement('p')
    regionTitle.textContent = 'районы:'
    formResultStep.appendChild(regionTitle)


    formObj.region.forEach(r => {

        const wantedRegions = document.createElement('p')
        wantedRegions.textContent = r

        formResultStep.appendChild(wantedRegions)
    })
}