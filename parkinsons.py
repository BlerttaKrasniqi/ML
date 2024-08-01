import numpy
import pandas
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.metrics import accuracy_score
import warnings

warnings.filterwarnings(action='ignore',category=UserWarning,module='sklearn')

parkinsons_dataset = pandas.read_csv("Datasets/parkinsons_dataset.csv")

#print(parkinsons_dataset['status'].value_counts())

#Kontrollo missing values:
#print(parkinsons_dataset.isnull().sum())

#------------------------------------------------------------------------------------------------------------

#Ndarja e te dhenave ne feature dhe target

x = parkinsons_dataset.drop(columns=['status','name'],axis=1)
y = parkinsons_dataset['status']

#Standardizimi i te dhenave

scaler = StandardScaler()
scaler.fit(x)

std_data = scaler.transform(x)
#print(std_data)
x = std_data

#-------------------------------

#Ndarja e te dhenave ne training data dhe test data

x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=0.3,stratify=y,random_state=2)

classifier = svm.SVC(kernel='linear')
classifier.fit(x_train,y_train)

x_train_prediction = classifier.predict(x_train)
train_accuracy = accuracy_score(x_train_prediction,y_train)
print("Train accuracy score: ",train_accuracy)

x_test_prediction = classifier.predict(x_test)
test_accuracy = accuracy_score(x_test_prediction,y_test)
print("Test accuracy score: ",test_accuracy)

