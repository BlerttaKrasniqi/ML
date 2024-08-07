import numpy
import pandas
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.metrics import accuracy_score
import warnings
import matplotlib.pyplot as plt
import seaborn
import pickle

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
#print("Train accuracy score: ",train_accuracy)

x_test_prediction = classifier.predict(x_test)
test_accuracy = accuracy_score(x_test_prediction,y_test)
#print("Test accuracy score: ",test_accuracy)


#-----------------------------------------------------------------------
#Programi per detektim ne baze te hyrjeve te dhena

input_data = (202.26600,211.60400,197.07900,0.00180,0.000009,0.00093,0.00107,0.00278,0.00954,0.08500,0.00469,0.00606,0.00719,0.01407,0.00072,32.68400,0.368535,0.742133,-7.695734,0.178540,1.544609,0.056141)
input_data_numpy_array = numpy.asarray(input_data)
input_data_standardized = scaler.transform(input_data_numpy_array.reshape(1, -1))
prediction = classifier.predict(input_data_standardized)
print("Prediction: ",prediction)


if prediction[0] == 1:
    print("The person has Parkinson's disease.")
else:
    print("The person does not have Parkinson's disease.")


# Scatter plots - vizualizimi i marredhenieve ndermjet dy karakteristikave numerike

# plt.figure(figsize=(10,6))
# colors = {0:'red',1:'blue'}
# plt.scatter(parkinsons_dataset['MDVP:Fo(Hz)'],parkinsons_dataset['MDVP:Fhi(Hz)'], c=parkinsons_dataset['status'].map(colors),alpha=0.5)
# plt.title('MDVP:Fo(Hz) vs MDVP:Fhi(Hz)')
# plt.xlabel('MDVP:Fo(Hz)')
# plt.ylabel('MDVP:Fhi(Hz)')
# plt.show()

# #Heatmap

# correlation_matrix = parkinsons_dataset.corr()
# plt.figure(figsize=(15,10))
# seaborn.heatmap(correlation_matrix,annot=True,cmap='coolwarm')
# plt.title('Correlation Matrix')
# plt.show()

# #Bar plot

# plt.figure(figsize=(10,6))


# parkinsons_dataset['status'].value_counts().plot(kind='bar')
# plt.title('Count of Parkinsons disease status')
# plt.xlabel('Status (0 = No, 1 = Yes)')
# plt.ylabel('Count')

# plt.show()

file_name = 'Models/parkinsons_model.sav'
pickle.dump(classifier,open(file_name,'wb'))
load_model = pickle.load(open(file_name,'rb'))