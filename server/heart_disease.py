import numpy 
import pandas
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn import svm
from sklearn.metrics import accuracy_score,confusion_matrix
import matplotlib.pyplot as plt
import seaborn
import pickle



heart_dataset = pandas.read_csv("Datasets/heart_disease_dataset.csv")

pandas.set_option('display.max_columns',None)
pandas.set_option('display.width',1000)



print(heart_dataset.head())



#print(heart_dataset.tail())

#Kontrollo missing value:


#print(heart_dataset.isnull().sum())



#------------------------------------------------------


x = heart_dataset.drop(columns='target',axis=1)
y = heart_dataset['target']
#print(y)



scaler = StandardScaler()
scaler.fit(x)
std_data = scaler.transform(x)
#print(std_data)
x = std_data

x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=0.3,stratify=y,random_state=2)

#print(x.shape,x_train.shape,x_test.shape)

# classifier = LogisticRegression()
# classifier.fit(x_train,y_train)

classifier = svm.SVC(kernel="linear")
classifier.fit(x_train,y_train)


x_train_prediction = classifier.predict(x_train)
train_accuracy = accuracy_score(x_train_prediction,y_train)
# print("Train accuracy score: ",train_accuracy)

x_test_prediction = classifier.predict(x_test)
test_accuracy = accuracy_score(x_test_prediction,y_test)
# print("Test accuracy score: ",test_accuracy)

cm = confusion_matrix(y_test,x_test_prediction)
# print("Confusion matrix")
# print(cm)
plt.figure(figsize=(8, 6))
seaborn.heatmap(cm, annot=True, fmt='d', cmap='Purples')
plt.title('Confusion Matrix')
plt.xlabel('Predicted')
plt.ylabel('Actual')
# plt.show()


with open('heart_disease_model.sav','wb') as f:
    pickle.dump((classifier,scaler),f)

def load_model(file_name = 'heart_disease_model.sav'):
    with open(file_name,'rb') as f:
        model,scaler = pickle.load(f)
    return model,scaler

def make_prediction(model,scaler,input_data):
    input_data = [float(i) for i in input_data.split(',')]
    input_data_np = numpy.array(input_data).reshape(1,-1)
    input_data_standardized = scaler.transform(input_data_np)
    prediction = model.predict(input_data_standardized)
    return prediction

def data_visualization():
    #Histogram
    plt.figure(figsize=(8,7))
    plt.xlabel('age', fontsize=10)
    plt.ylabel('count',fontsize=10)
    heart_dataset['age'].hist(edgecolor="black")
    plt.show()


#Pair plot

    seaborn.pairplot(heart_dataset[['age','sex','cp','target']],hue='target')
    plt.show()

    # Heatmap

    correlation_matrix = heart_dataset.corr()
    plt.figure(figsize=(15,10))
    seaborn.heatmap(correlation_matrix,annot=True,cmap='coolwarm')
    plt.title('Correlation Matrix')
    plt.show()

    #Bar plot

    plt.figure(figsize=(10,6))
    heart_dataset['target'].value_counts().plot(kind='bar')
    plt.title('Count of heart disease status')
    plt.xlabel('Status (0 = No, 1 = Yes)')
    plt.ylabel('Count')
    plt.show()

if __name__ == '__main__':
    data_visualization()



