from flask import Flask, render_template, request, url_for, session
from flask_session import Session
from pymysql import connections
import os
import boto3
import socket

customhost = "focsdb.cpkr5ofaey5p.us-east-1.rds.amazonaws.com"
customuser = "admin"
custompass = "admin123"
customdb = "focsDB"
custombucket = "semfocs-bucket"
customregion = "us-east-1"

app = Flask(__name__, static_folder='assets')
#Session
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
bucket = custombucket
region = customregion

db_conn = connections.Connection(
    host=customhost,
    port=3306,
    user=customuser,
    password=custompass,
    db=customdb

)
output = {}

@app.route("/", methods=['GET', 'POST'])
def home():
    ip_address = request.remote_addr
    session['address'] = ip_address
    return render_template('index.html')

@app.route("/staffs", methods=['GET', 'POST'])
def staffs():
    return render_template('staff.html')

#------Enroll--------------
@app.route("/enroll", methods=['GET', 'POST'])
def enroll():
    return render_template('enroll.html')

@app.route("/enroll2", methods=['GET', 'POST'])
def enroll2():
    return render_template('enroll-2.html')

@app.route("/facility", methods=['GET', 'POST'])
def facility():
    return render_template('facility.html')

@app.route("/FAQ", methods=['GET', 'POST'])
def faq():
    session.pop('msg', default=None)
    return render_template('FAQ.html', inquiry=None)


@app.route('/courses/<int:id>')
def courses(id):

    if id == 1: #doc
        doc_statement = "SELECT prog_id, prog_name, prog_duration FROM Programme WHERE lvl_id = 1"
        doc_cursor = db_conn.cursor()
        doc_cursor.execute(doc_statement)
        result = doc_cursor.fetchall()
        doc_cursor.close()

        doc_statement1 = "SELECT * FROM ProgrammeLevel WHERE lvl_id = 1"
        doc_cursor1 = db_conn.cursor()
        doc_cursor1.execute(doc_statement1)
        lvl = doc_cursor1.fetchone()
        doc_cursor1.close()
        
        return render_template('courses.html', prog=result, name=lvl)

    elif id == 2:#master
        doc_statement = "SELECT prog_id, prog_name, prog_duration FROM Programme WHERE lvl_id = 2"
        doc_cursor = db_conn.cursor()
        doc_cursor.execute(doc_statement)
        result = doc_cursor.fetchall()
        doc_cursor.close()

        doc_statement1 = "SELECT * FROM ProgrammeLevel WHERE lvl_id = 2"
        doc_cursor1 = db_conn.cursor()
        doc_cursor1.execute(doc_statement1)
        lvl = doc_cursor1.fetchone()
        doc_cursor1.close()
        
        return render_template('courses.html', prog=result, name=lvl)

    elif id == 3: #bachelor
        doc_statement = "SELECT prog_id, prog_name, prog_duration FROM Programme WHERE lvl_id = 3"
        doc_cursor = db_conn.cursor()
        doc_cursor.execute(doc_statement)
        result = doc_cursor.fetchall()
        doc_cursor.close()

        doc_statement1 = "SELECT * FROM ProgrammeLevel WHERE lvl_id = 3"
        doc_cursor1 = db_conn.cursor()
        doc_cursor1.execute(doc_statement1)
        lvl = doc_cursor1.fetchone()
        doc_cursor1.close()
        
        return render_template('courses.html', prog=result, name=lvl)
        
    elif id == 4: #diploma
        doc_statement = "SELECT prog_id, prog_name, prog_duration FROM Programme WHERE lvl_id = 4"
        doc_cursor = db_conn.cursor()
        doc_cursor.execute(doc_statement)
        result = doc_cursor.fetchall()
        doc_cursor.close()

        doc_statement1 = "SELECT * FROM ProgrammeLevel WHERE lvl_id = 4"
        doc_cursor1 = db_conn.cursor()
        doc_cursor1.execute(doc_statement1)
        lvl = doc_cursor1.fetchone()
        doc_cursor1.close()
        
        return render_template('courses.html', prog=result, name=lvl)

    else:
        return render_template('index.html')



@app.route('/courses-singel/<int:id>')
def coursesSingel(id):
    try:
        # Get programme
        statement = "SELECT * FROM Programme WHERE prog_id = %s"
        cursor = db_conn.cursor()
        cursor.execute(statement, (id))
        prog = cursor.fetchone()
        cursor.close()

        # Get level
        statement = "SELECT * FROM ProgrammeLevel WHERE lvl_id = %s"
        cursor = db_conn.cursor()
        cursor.execute(statement, (prog[1]))
        lvl = cursor.fetchone()
        cursor.close()

        # Get all outline
        outline_statement = "SELECT * FROM Outline WHERE prog_id = %s"
        outline_cursor = db_conn.cursor()
        outline_cursor.execute(outline_statement, (id))
        out = outline_cursor.fetchall()
        outline_cursor.close()

        # Get all career
        career_statement = "SELECT * FROM Career WHERE prog_id = %s"
        career_cursor = db_conn.cursor()
        career_cursor.execute(career_statement, (id))
        care = career_cursor.fetchall()
        career_cursor.close()

        # Get progression
        if prog[1] == 4:
            progress_statement = """
                SELECT Progression.future, Programme.prog_name
                FROM Programme
                INNER JOIN Progression ON Programme.prog_id = Progression.future
                WHERE Progression.current = %s
            """
            progress_cursor = db_conn.cursor()
            progress_cursor.execute(progress_statement, (id,))
            gress = progress_cursor.fetchall()
            progress_cursor.close()

            # Debug: Print progression results
            print("Progression Results:", gress)

            return render_template('courses-singel.html', programme=prog, outline=out, career=care, progress=gress, level=lvl)

        return render_template('courses-singel.html', programme=prog, outline=out, career=care, level=lvl)

    except Exception as e:
        # Handle exceptions, print the error message, and return an error page if needed
        print("Error:", str(e))
        return render_template('error.html', error_message=str(e))


#------Inquiry--------------------
@app.route('/submitInquiry', methods=['POST'])
def submitInquiry():
    userName = request.form['userName']
    userEmail = request.form['userEmail']
    question = request.form['question']
    status = "pending"

    cursor = db_conn.cursor()

    # Get the maximum inquiry number from the database
    cursor.execute("SELECT MAX(CAST(SUBSTRING(inquiry_id, 8) AS SIGNED)) FROM Inquiry")
    max_inquiry_number = cursor.fetchone()[0]

    if max_inquiry_number is None:
        max_inquiry_number = 0

    # Increment the inquiry number
    new_inquiry_number = max_inquiry_number + 1

    # Create the new inquiry_id
    inquiry_id = f'Inquiry{new_inquiry_number}'

    insert_sql = "INSERT INTO Inquiry (inquiry_id, userName, userEmail, question, status) VALUES (%s, %s, %s, %s, %s)"
    cursor.execute(insert_sql, (inquiry_id, userName, userEmail, question, status))
    db_conn.commit()  # Commit the changes to the database

    cursor.close()

    session["msg"] = inquiry_id

    return render_template('FAQ.html', inquiry=None)

@app.route('/viewInquiry', methods=['GET','POST'])
def viewInquiry():
    inquiry_id = request.form['inquiry_id']

    cursor = db_conn.cursor()

    statement = "SELECT * FROM Inquiry WHERE inquiry_id = %s"
    cursor.execute(statement, (inquiry_id))
    result = cursor.fetchone()

    return render_template('FAQ.html', inquiry=result)

        
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
