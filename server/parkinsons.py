import numpy
import pandas
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import warnings
import matplotlib.pyplot as plt
import seaborn
import pickle

warnings.filterwarnings(action='ignore',category=UserWarning,module='sklearn')

parkinsons_dataset = pandas.read_csv("Datasets/parkinsons_dataset.csv")


#print(parkinsons_dataset['status'].value_counts())

#print(parkinsons_dataset.isnull().sum())

#------------------------------------------------------------------------------------------------------------


x = parkinsons_dataset.drop(columns=['status','name'],axis=1)
y = parkinsons_dataset['status']


scaler = StandardScaler()
scaler.fit(x)

std_data = scaler.transform(x)
#print(std_data)
x = std_data

#-------------------------------


x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=0.3,stratify=y,random_state=2)

classifier = svm.SVC(kernel='linear')
classifier.fit(x_train,y_train)

# classifier = LogisticRegression()
# classifier.fit(x_train,y_train)

x_train_prediction = classifier.predict(x_train)
train_accuracy = accuracy_score(x_train_prediction,y_train)
print("Train accuracy score: ",train_accuracy)

x_test_prediction = classifier.predict(x_test)
test_accuracy = accuracy_score(x_test_prediction,y_test)
print("Test accuracy score: ",test_accuracy)


with open('parkinsons_model.sav','wb') as f:
    pickle.dump((classifier,scaler),f)

def load_model(file_name = 'parkinsons_model.sav'):
    with open(file_name,'rb') as f:
        model,scaler = pickle.load(f)
    return model,scaler

def make_prediction(model,scaler,input_data):
    input_data = [float(i) for i in input_data.split(',')]
    input_data_np = numpy.array(input_data).reshape(1,-1)
    input_data_standardized = scaler.transform(input_data_np)
    prediction=model.predict(input_data_standardized)
    return prediction


#-----------------------------------------------------------------------

#Scatter plots 

def data_visualization():
    plt.figure(figsize=(10, 6))
    colors = {0: 'red', 1: 'blue'}
    plt.scatter(parkinsons_dataset['MDVP:Fo(Hz)'], parkinsons_dataset['MDVP:Fhi(Hz)'], c=parkinsons_dataset['status'].map(colors), alpha=0.5)
    plt.title('MDVP:Fo(Hz) vs MDVP:Fhi(Hz)')
    plt.xlabel('MDVP:Fo(Hz)')
    plt.ylabel('MDVP:Fhi(Hz)')
    plt.show()

    # Heatmap - Drop non-numeric columns for correlation calculation
    numeric_dataset = parkinsons_dataset.drop(columns=['name'])
    correlation_matrix = numeric_dataset.corr()
    plt.figure(figsize=(15, 10))
    seaborn.heatmap(correlation_matrix, annot=True, cmap='coolwarm')
    plt.title('Correlation Matrix')
    plt.show()

    # Bar plot
    plt.figure(figsize=(10, 6))
    parkinsons_dataset['status'].value_counts().plot(kind='bar')
    plt.title('Count of Parkinsons Disease Status')
    plt.xlabel('Status (0 = No, 1 = Yes)')
    plt.ylabel('Count')
    plt.show()


if __name__ == '__main__':
    data_visualization()
