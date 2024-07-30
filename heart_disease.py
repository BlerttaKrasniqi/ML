import numpy #per vargje
import pandas # per frames
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

#ngarkimi i dataset

heart_dataset = pandas.read_csv("Datasets/heart_disease_dataset.csv")

pandas.set_option('display.max_columns',None)
pandas.set_option('display.width',1000)

#printo 5 rreshtat e pare te datasetit
#print(heart_dataset.head())

#printo 5 rreshtat e fundit te datasetit

#print(heart_dataset.tail())

#Kontrollo missing value:

#print(heart_dataset.isnull().sum())

#ndarja e te dhenave ne  feature and target

x = heart_dataset.drop(columns='target',axis=1)
y = heart_dataset['target']
#print(y)

#Standardizimi i te dhenave

scaler = StandardScaler()
scaler.fit(x)
std_data = scaler.transform(x)
print(std_data)
x = std_data
#Ndarja e te dhenave ne training data dhe test data

x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=0.3,stratify=y,random_state=2)

#print(x.shape,x_train.shape,x_test.shape)