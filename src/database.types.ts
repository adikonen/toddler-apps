export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      dictionaries: {
        Row: {
          created_at: string
          dictionary_category_id: number
          id: number
          image: string
          sound: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          dictionary_category_id: number
          id?: number
          image: string
          sound?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          dictionary_category_id?: number
          id?: number
          image?: string
          sound?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'dictionaries_dictionary_category_id_fkey'
            columns: ['dictionary_category_id']
            isOneToOne: false
            referencedRelation: 'dictionary_categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'dictionaries_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      dictionary_categories: {
        Row: {
          created_at: string
          id: number
          image: string
          type: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          image: string
          type?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          image?: string
          type?: string | null
        }
        Relationships: []
      }
      dictionary_category_details: {
        Row: {
          created_at: string
          dictionary_category_id: number
          id: number
          locale_code: string
          name: string
        }
        Insert: {
          created_at?: string
          dictionary_category_id: number
          id?: number
          locale_code: string
          name: string
        }
        Update: {
          created_at?: string
          dictionary_category_id?: number
          id?: number
          locale_code?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'dictionary_category_details_dictionary_category_id_fkey'
            columns: ['dictionary_category_id']
            isOneToOne: false
            referencedRelation: 'dictionary_categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'dictionary_category_details_locale_code_fkey'
            columns: ['locale_code']
            isOneToOne: false
            referencedRelation: 'locales'
            referencedColumns: ['code']
          }
        ]
      }
      dictionary_details: {
        Row: {
          created_at: string
          description: string | null
          dictionary_id: number
          id: number
          locale_code: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          dictionary_id: number
          id?: number
          locale_code: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          dictionary_id?: number
          id?: number
          locale_code?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'dictionary_details_dictionary_id_fkey'
            columns: ['dictionary_id']
            isOneToOne: false
            referencedRelation: 'dictionaries'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'dictionary_details_locale_code_fkey'
            columns: ['locale_code']
            isOneToOne: false
            referencedRelation: 'locales'
            referencedColumns: ['code']
          }
        ]
      }
      locales: {
        Row: {
          code: string
          created_at: string
          image: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          image: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          image?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
