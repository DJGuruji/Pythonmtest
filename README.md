# PYTHON MACHINE TEST

##  Project Setup

Both Frontend and Backend are in the same repository

## Installation

To get started with the project, follow these steps:


```bash
git clone https://github.com/DJGuruji/Pythonmtest.git
cd Pythonmtest

```
## Front end setup
make sure you are in " Pythonmtest " directory

```bash
cd front
npm install
npm run dev
```
## Backend setup

make sure you are in " Pythonmtest " directory

```bash
cd back
python3 -m venv venv
#start virtual env
source venv/bin/activate #if you are using linux
venv\Scripts\activate #if you are using windows
cd mtest
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py runserver

```

<img src="https://github.com/DJGuruji/Pythonmtest/blob/main/assets/img1.png?raw=true" alt="Pythonmtest" width="800" height="500">
<img src="https://github.com/DJGuruji/Pythonmtest/blob/main/assets/img2.png?raw=true" alt="Pythonmtest" width="800" height="500">
<img src="https://github.com/DJGuruji/Pythonmtest/blob/main/assets/img3.png?raw=true" alt="Pythonmtest" width="800" height="500">



