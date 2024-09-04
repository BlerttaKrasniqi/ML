import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.metrics import accuracy_score,confusion_matrix
from sklearn.linear_model import LogisticRegression
import warnings
import matplotlib.pyplot as plt
import seaborn as sns
import pickle

warnings.filterwarnings(action='ignore', category=UserWarning, module='sklearn')


diabetes_dataset = pd.read_csv('Datasets/diabetes_dataset.csv')

print(diabetes_dataset.head())


x = diabetes_dataset.drop(columns='diabetes', axis=1)
y = diabetes_dataset['diabetes']


scaler = StandardScaler()
non_numerical_columns = ['gender', 'smoking_history']
nr_columns = [column for column in x.columns if column not in non_numerical_columns]

encoder = OneHotEncoder()
x_non_numerical_encoder = encoder.fit_transform(x[non_numerical_columns]).toarray()
x_nr_columns_standardized = scaler.fit_transform(x[nr_columns])
x_transformed = np.hstack((x_nr_columns_standardized, x_non_numerical_encoder))


x_train, x_test, y_train, y_test = train_test_split(x_transformed, y, test_size=0.3, stratify=y, random_state=2)


classifier = svm.SVC(kernel='linear')
classifier.fit(x_train, y_train)
# classifier = LogisticRegression()
# classifier.fit(x_train,y_train)


x_train_prediction = classifier.predict(x_train)
train_accuracy = accuracy_score(y_train, x_train_prediction)
print(train_accuracy)
x_test_prediction = classifier.predict(x_test)
test_accuracy = accuracy_score(y_test, x_test_prediction)
print(test_accuracy)

cm = confusion_matrix(y_test,x_test_prediction)
print("Confusion matrix")
print(cm)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Reds')
plt.title('Confusion Matrix')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.show()


with open('Models/diabetes_model.sav', 'wb') as f:
    pickle.dump((classifier, scaler, encoder), f)

def load_model(filename='Models/diabetes_model.sav'):
    with open(filename, 'rb') as f:
        model, scaler, encoder = pickle.load(f)
    return model, scaler, encoder

def make_prediction(model, scaler, encoder, input_data):
    input_data = input_data.split(',')
    user_input_non_numerical = [input_data[0], input_data[4]]
    user_input_numerical = [float(input_data[1]), float(input_data[2]), 
                            float(input_data[3]), float(input_data[5]), 
                            float(input_data[6]), float(input_data[7])]

    user_input_non_numerical_encoded = encoder.transform([user_input_non_numerical]).toarray()
    user_input_numerical = np.array(user_input_numerical).reshape(1, -1)
    user_input_numerical_standardized = scaler.transform(user_input_numerical)
    user_input_transformed = np.hstack((user_input_numerical_standardized, user_input_non_numerical_encoded))
    prediction = model.predict(user_input_transformed)
    return prediction

def data_visualization():
    plt.figure(figsize=(10, 6))
    plt.scatter(diabetes_dataset['age'], diabetes_dataset['blood_glucose_level'])
    plt.title('Age vs Blood Glucose Level')
    plt.xlabel('Age')
    plt.ylabel('Blood Glucose Level')
    plt.show()

    numeric_columns = diabetes_dataset.select_dtypes(include=[np.number])
    correlation_matrix = numeric_columns.corr()
    plt.figure(figsize=(15, 10))
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm')
    plt.title('Correlation Matrix')
    plt.show()

    plt.figure(figsize=(10, 6))
    diabetes_dataset['diabetes'].value_counts().plot(kind='bar')
    plt.title('Count of Diabetes Disease Status')
    plt.xlabel('Status (0 = No, 1 = Yes)')
    plt.ylabel('Count')
    plt.show()

# if __name__ == '__main__':
    #data_visualization()




    